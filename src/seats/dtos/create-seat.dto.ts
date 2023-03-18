import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSeatDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(4)
  readonly number: string;
}
