import { ObjectId } from 'mongoose';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { BookingService } from './booking.service';
import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/schemas/user.schema';

@UseGuards(AuthGuard())
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  createBooking(@Body() body: CreateBookingDto, @GetUser() currentUser: User) {
    const booking = this.bookingService.create(currentUser, body);

    return booking;
  }

  @Put(':id/cancel')
  cancelBooking(
    @Param('id') id: ObjectId,
    @GetUser() currentUser: User,
    @Req() request,
  ) {
    console.log('request', request);
    return this.bookingService.cancel(currentUser, id);
  }
}
