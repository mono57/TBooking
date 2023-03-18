import { MailService } from './../core/services/mail.service';
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
    private readonly ridesService: RidesService,
    private readonly mailService: MailService,
  ) {}

  async create(user: User, dto: CreateBookingDto): Promise<any> {
    const { ride, seat, ride_on } = dto;
    //individually check if ride exists and is active
    //Todo: Validate that ride_on date is not in the past
    try {
      const _seat = await this.seatService.findOne(seat);
      const _ride = await this.ridesService.findOne(ride);

      const rideSeat = await this.ridesService.findRideSeat(_seat, _ride);

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
      const savedObj = await bookingObj.save();
      this.mailService.sendMail('Booking Successful', user.email, 'You added');

      return savedObj;
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
      const canceledBooking = await booking.save();

      this.mailService.sendMail(
        'Booking Canceled',
        user.email,
        'You cancel the booking',
      );

      return canceledBooking;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async searchAvailableTickets(rideId: string): Promise<any> {
    return await this.ridesService.findAvailableRideSeatByRide(rideId);
  }

  async findAll(): Promise<any> {
    return await this.model.find();
  }
}
