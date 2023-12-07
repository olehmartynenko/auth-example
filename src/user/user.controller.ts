import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from './dto';
import { AuthGuard } from 'src/auth/guards';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  me(@Req() req: Request): Promise<UserDto> {
    return this.userService.me(req.headers.authorization);
  }

  @Patch(':id')
  updateUser(@Param('id') userId: number, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(userId, dto);
  }
}
