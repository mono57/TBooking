import { IsObjectId } from 'class-validator-mongo-object-id';
import { IsNotEmpty } from 'class-validator';

export class SearchTicketDto {
  @IsObjectId()
  @IsNotEmpty()
  readonly ride: string;
}
