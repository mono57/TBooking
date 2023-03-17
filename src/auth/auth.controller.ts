import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    const createdUser = this.authService.createUser(body);

    return createdUser;
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    const token = this.authService.login(body);

    return token;
  }
}
