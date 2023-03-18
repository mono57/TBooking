import { CreateRideDto } from './dtos/create-ride.dto';
import { AuthGuard } from '@nestjs/passport';
import { RidesService } from './rides.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/auth/schemas/user.schema';
import { GetUser } from 'src/auth/get-user.decorator';

@UseGuards(AuthGuard())
@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post()
  createRide(@Body() body: CreateRideDto, @GetUser() currentUser: User) {
    const ride = this.ridesService.create(currentUser, body);

    return ride;
  }
}
