import { Ride } from 'src/rides/schemas/rides.schema';
import { Seat } from './../../seats/schemas/seat.schema';
import { BaseSchema } from 'src/core/schemas/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export type RideSeatDocument = HydratedDocument<RideSeat>;

@Schema()
export class RideSeat extends BaseSchema {
  @Prop({ required: true, default: true })
  usable: boolean;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Seat' })
  seat: Seat;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Ride' })
  ride: Ride;
}

export const RideSeatSchema = SchemaFactory.createForClass(RideSeat);
