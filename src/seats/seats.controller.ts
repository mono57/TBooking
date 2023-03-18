import { ObjectId } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { CreateSeatDto } from './dtos/create-seat.dto';
import { AuthGuard } from '@nestjs/passport';
import { SeatsService } from './seats.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';

@UseGuards(AuthGuard())
@Controller('seats')
export class SeatsController {
  constructor(private readonly seatService: SeatsService) {}

  @Post()
  createSeat(@Body() body: CreateSeatDto, @GetUser() currentUser: User) {
    return this.seatService.create(currentUser, body);
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.seatService.findOne(id);
  }

  @Get()
  findAll() {
    return this.seatService.findAll();
  }
}
