import { Injectable } from '@nestjs/common';
import { UpdateUserDto, UserDto } from './dto';

@Injectable()
export class UserService {
  async me(): Promise<UserDto> {
    return {
      id: 1,
      email: 'test@test.com',
      name: 'test',
    };
  }

  async editUser(userId: number, data: UpdateUserDto): Promise<UserDto> {
    return {
      id: userId,
      email: data.email || '',
      name: data.name || '',
    };
  }
}
