import { RegisterDto } from './dtos/register.dto';
import { User, UserDocument } from './schemas/user.schema';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  async createUser(dto: RegisterDto): Promise<any> {
    try {
      const obj = new this.model(dto);

      await obj.setPassword(dto.password);

      return await obj.save();
    } catch (err) {
      const { name, code } = err;

      if (name == 'MongoServerError' && code == 11000)
        throw new ConflictException('Email must be unique');
      throw new InternalServerErrorException(err);
    }
  }
}
