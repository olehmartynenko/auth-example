import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateUserDto, UserDto } from 'src/user/dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(credentials: AuthDto): Promise<any> {
    return `Your email is ${credentials.email}`;
  }

  async signUp(data: CreateUserDto): Promise<UserDto> {
    const hashedPassword = await argon.hash(data.password);
    try {
      const user = await this.prisma.user.create({
        data: { ...data, password: hashedPassword },
      });

      delete user.password;

      return user;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('User with this email already exists');
      }
    }
  }
}
