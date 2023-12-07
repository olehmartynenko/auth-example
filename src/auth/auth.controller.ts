import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { UserDto } from 'src/user/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: AuthDto): Promise<any> {
    return this.authService.login(credentials);
  }

  @Post('signup')
  async signUp(@Body() userData): Promise<UserDto> {
    return this.authService.signUp(userData);
  }
}
