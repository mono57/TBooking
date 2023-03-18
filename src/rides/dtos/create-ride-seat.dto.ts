import { IsNotEmpty } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { ObjectId } from 'mongoose';

export class CreateRideSeatDto {
  @IsObjectId()
  @IsNotEmpty()
  readonly seat: ObjectId;
}
