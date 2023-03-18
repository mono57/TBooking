import { ObjectId } from 'mongoose';
import { IsNotEmpty, IsDate } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { Type } from 'class-transformer';

export class CreateBookingDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  readonly ride_on: Date;

  @IsObjectId()
  @IsNotEmpty()
  readonly ride: ObjectId;

  @IsObjectId()
  @IsNotEmpty()
  readonly seat: ObjectId;
}
