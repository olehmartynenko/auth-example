import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from './dto';
import { AuthGuard } from 'src/auth/guards';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  me(): Promise<any> {
    return this.userService.me();
  }

  @Patch(':id')
  editUser(
    @Param('id') userId: number,
    @Body() data: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.editUser(userId, data);
  }
}
