import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly first_name: string;

  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  readonly last_name: string;

  phone_number: string;
}
