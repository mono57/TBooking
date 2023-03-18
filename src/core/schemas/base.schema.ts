import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export class BaseSchema {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  created_by_user: User;

  @Prop({ required: true, default: Date.now })
  created_on: Date;

  @Prop({ required: false })
  modified_on: Date;
}
