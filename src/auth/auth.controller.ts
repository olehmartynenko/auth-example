import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { UserDto } from 'src/user/dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() credentials: AuthDto,
    @Res() res: Response,
  ): Promise<Response> {
    const token = await this.authService.login(credentials);
    return res.set({ 'x-access-token': token }).send({ token });
  }

  @Post('signup')
  async signUp(@Body() userData): Promise<UserDto> {
    return this.authService.signUp(userData);
  }
}
