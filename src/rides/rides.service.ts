import { SeatsService } from './../seats/seats.service';
import { Seat } from 'src/seats/schemas/seat.schema';
import { RideSeat, RideSeatDocument } from './schemas/ride-seat.schema';
import { Ride, RideDocument } from './schemas/rides.schema';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import mongoose, { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRideDto } from './dtos/create-ride.dto';
import { User } from 'src/auth/schemas/user.schema';
import { CreateRideSeatDto } from './dtos/create-ride-seat.dto';

@Injectable()
export class RidesService {
  constructor(
    @InjectModel(Ride.name) private model: Model<RideDocument>,
    @InjectModel(RideSeat.name) private rideSeatModel: Model<RideSeatDocument>,
    private readonly seatService: SeatsService,
  ) {}

  async create(user: User, dto: CreateRideDto): Promise<any> {
    try {
      const { from_location, to_location } = dto;
      if (from_location.toLowerCase() === to_location.toLowerCase())
        throw new BadRequestException(
          'Cannot ride from a location to the same location',
        );

      const rideExists = await this.model.exists({
        from_location,
        to_location,
      });

      if (rideExists)
        throw new BadRequestException('This ride already exits !');

      const rideObj = new this.model({ ...dto, created_by_user: user });

      return await rideObj.save();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findOne(id: ObjectId): Promise<any> {
    try {
      const seat = await this.model.findById(id);

      if (!seat) throw new NotFoundException('The ride has not found !');

      return seat;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findRideSeat(seat: Seat, ride: Ride): Promise<any> {
    const rideSeat = await this.rideSeatModel.findOne({
      seat,
      ride,
    });

    if (rideSeat === null) throw new NotFoundException('Ride seat not found!');

    return rideSeat;
  }

  async createRideSeat(user: User, rideId: ObjectId, dto: CreateRideSeatDto) {
    try {
      const ride = await this.findOne(rideId);
      const seat = await this.seatService.findOne(dto.seat);

      if (!seat.usable)
        throw new BadRequestException('The seat you choose is not usable!');

      const rideSeat = await this.rideSeatModel.findOne({
        seat,
        ride,
      });

      if (!rideSeat === null)
        throw new BadRequestException('Ride Seat already exists!');

      const rideSeatObj = new this.rideSeatModel({
        ride,
        seat,
        created_by_user: user,
      });

      return await rideSeatObj.save();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findAvailableRideSeatByRide(rideId: string): Promise<any> {
    return await this.rideSeatModel.aggregate([
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'ride_seat',
          as: 'book',
        },
      },
      {
        $match: {
          'book.ride_seat': {
            $exists: false,
          },
          ride: new mongoose.Types.ObjectId(rideId),
        },
      },
    ]);
  }
}
