import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRideDto {
  @IsString()
  @IsNotEmpty()
  readonly from_location: string;

  @IsString()
  @IsNotEmpty()
  readonly to_location: string;
}
