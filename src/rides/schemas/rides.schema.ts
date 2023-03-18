import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export type RideDocument = HydratedDocument<Ride>;

@Schema()
export class Ride {
  @Prop({ required: true })
  from_location: string;

  @Prop({ required: true })
  to_location: string;

  @Prop({ required: true, default: true })
  is_active: boolean;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  created_by_user: User;
}

export const RideSchema = SchemaFactory.createForClass(Ride);
