import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly first_name: string;

  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  readonly last_name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(60)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is weak. Please choose another',
  })
  password: string;

  phone_number: string;
}
