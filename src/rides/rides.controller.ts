import { ObjectId } from 'mongoose';
import { CreateRideDto } from './dtos/create-ride.dto';
import { AuthGuard } from '@nestjs/passport';
import { RidesService } from './rides.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/auth/schemas/user.schema';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateRideSeatDto } from './dtos/create-ride-seat.dto';

@UseGuards(AuthGuard())
@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post()
  createRide(@Body() body: CreateRideDto, @GetUser() currentUser: User) {
    const ride = this.ridesService.create(currentUser, body);

    return ride;
  }

  @Post(':seatId/seats')
  createRideSeat(
    @Param('seatId') seatId: ObjectId,
    @Body() body: CreateRideSeatDto,
    @GetUser() currentUser: User,
  ) {
    return this.ridesService.createRideSeat(currentUser, seatId, body);
  }

  @Get('count')
  countRides() {
    return this.ridesService.countAvailableRides();
  }
}
