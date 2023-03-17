import { Seat, SeatDocument } from './schemas/seat.schema';
import { CreateSeatDto } from './dtos/create-seat.dto';
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class SeatsService {
  constructor(@InjectModel(Seat.name) private model: Model<SeatDocument>) {}

  async create(user: User, dto: CreateSeatDto): Promise<any> {
    const { number } = dto;

    try {
      const seatObj = new this.model({ ...dto, created_by_user: user });

      return await seatObj.save();
    } catch (err) {
      const { name, code } = err;

      if (name === 'MongoServerError' && code == 11000)
        throw new BadRequestException(
          `A seat with this number ${number} already exists !`,
        );

      throw new InternalServerErrorException(err);
    }
  }
}
