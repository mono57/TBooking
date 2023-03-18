import { RideSeat } from './../../rides/schemas/ride-seat.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/core/schemas/base.schema';

export type BookingDocument = HydratedDocument<Booking>;

@Schema()
export class Booking extends BaseSchema {
  @Prop({ required: true })
  ride_on: Date;

  @Prop({ required: true, default: false })
  canceled: boolean;

  // @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Ride' })
  // ride: Ride;

  // @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Seat' })
  // seat: Seat;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RideSeat',
  })
  ride_seat: RideSeat;

  @Prop({ required: false })
  cancel_date: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
