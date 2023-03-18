import { RidesService } from './../rides/rides.service';
import { SeatsService } from './../seats/seats.service';
import { Booking, BookingDocument } from './schemas/booking.schema';
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { CreateBookingDto } from './dtos/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private model: Model<BookingDocument>,
    private readonly seatService: SeatsService,
    private readonly rideService: RidesService,
  ) {}

  async create(user: User, dto: CreateBookingDto): Promise<any> {
    const { ride, seat, ride_on } = dto;
    //individually check if ride exists and is active
    //Todo: Validate that ride_on date is not in the past
    try {
      const _seat = await this.seatService.findOne(seat);
      const _ride = await this.rideService.findOne(ride);

      const rideSeat = await this.rideService.findRideSeat(_seat, _ride);

      const rideExists = await this.model.exists({
        ride_seat: rideSeat,
        ride_on,
      });

      if (!rideExists === null)
        throw new BadRequestException('Booking already exits !');

      const bookingObj = new this.model({
        ride_seat: rideSeat,
        ride_on,
        created_by_user: user,
      });

      return await bookingObj.save();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async cancel(user: User, id: ObjectId): Promise<any> {
    try {
      const booking = await this.model.findById(id);

      if (booking === null) throw new NotFoundException('Booking not found');

      if (booking.created_by_user.valueOf() !== user['id'].valueOf())
        throw new UnauthorizedException(
          'You are not allow to cancel this booking',
        );

      booking.cancel_date = new Date();
      booking.canceled = true;

      return await booking.save();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
