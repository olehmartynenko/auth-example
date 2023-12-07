import { Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  me(): Promise<any> {
    return this.userService.me();
  }

  @Patch(':id')
  editUser(@Param('id') userId: number) {
    return this.userService.editUser(userId);
  }
}
