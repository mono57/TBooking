import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/core/schemas/base.schema';

export type SeatDocument = HydratedDocument<Seat>;

@Schema()
export class Seat extends BaseSchema {
  @Prop({ required: true, maxlength: 4, unique: true })
  number: string;

  @Prop({ required: true, default: true })
  usable: boolean;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);
