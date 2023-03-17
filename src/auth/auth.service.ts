import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { User, UserDocument } from './schemas/user.schema';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

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

  async login(dto: LoginDto): Promise<any> {
    const obj = await this.model.findOne({ email: dto.email });

    if (obj && (await bcrypt.compare(dto.password, obj.password))) {
      const payload = { email: dto.email };

      const accessToken = await this.jwtService.sign(payload);
      return { access_token: accessToken };
    }
    throw new UnauthorizedException('Invalid user credentials');
  }
}
