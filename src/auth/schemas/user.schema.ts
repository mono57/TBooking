import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone_number: string;

  @Prop({ required: true, default: true })
  is_active: boolean;

  @Prop({ required: true, default: false })
  is_superuser: boolean;

  setPassword: (string) => void;
  isAdmin: () => boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.setPassword = async function setPassword(password: string) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  this.password = hashedPassword;
};

UserSchema.methods.isAdmin = async function isAdmin() {
  return this.is_active && this.is_superuser;
};
