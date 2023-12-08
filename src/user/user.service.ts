import { Injectable } from '@nestjs/common';
import { UpdateUserDto, UserDto } from './dto';
import { AuthException } from '../auth/exceptions/auth.exceptions';
import { jwtDecode } from 'jwt-decode';
import { PrismaService } from '../prisma/prisma.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async me(auth: string): Promise<UserDto> {
    const token = auth.split(' ')[1];
    const payload = jwtDecode(token);
    const id = Number(payload.sub);
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AuthException('User is not found');
    }

    return plainToClass(UserDto, user);
  }

  async updateUser(userId: number, data: UpdateUserDto): Promise<UserDto> {
    const user = await this.prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        ...data,
      },
    });

    return plainToClass(UserDto, user);
  }
}
