import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateUserDto, UserDto } from 'src/user/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthException } from './exceptions/auth.exceptions';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(credentials: AuthDto): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user) {
      throw new AuthException('User with this email does not exist');
    }

    const valid = await argon.verify(user.password, credentials.password);

    if (!valid) {
      throw new AuthException('Invalid password');
    }

    return this.signToken(user);
  }

  async signUp(data: CreateUserDto): Promise<string> {
    const hashedPassword = await argon.hash(data.password);
    try {
      const user = await this.prisma.user.create({
        data: { ...data, password: hashedPassword },
      });

      return this.signToken(user);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new AuthException('User with this email already exists');
      }
    }
  }

  signToken(user: UserDto): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_ACCESS_EXPIRATION'),
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
