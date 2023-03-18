import { Ride, RideDocument } from './schemas/rides.schema';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRideDto } from './dtos/create-ride.dto';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class RidesService {
  constructor(@InjectModel(Ride.name) private model: Model<RideDocument>) {}

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
}
