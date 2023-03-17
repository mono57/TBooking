import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export type SeatDocument = HydratedDocument<Seat>;

class BaseSchema {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  created_by_user: User;
}

@Schema()
export class Seat extends BaseSchema {
  @Prop({ required: true, maxlength: 4, unique: true })
  number: string;

  @Prop({ required: true, default: true })
  usable: boolean;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);
