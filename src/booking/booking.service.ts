import { RidesService } from './../rides/rides.service';
import { SeatsService } from './../seats/seats.service';
import { Booking, BookingDocument } from './schemas/booking.schema';
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Model } from 'mongoose';
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

      const rideExists = await this.model.exists({ seat, ride, ride_on });

      if (!rideExists === null)
        throw new BadRequestException('Booking already exits !');

      const bookingObj = new this.model({
        ride: _ride,
        seat: _seat,
        ride_on,
        created_by_user: user,
      });

      return bookingObj.save();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
