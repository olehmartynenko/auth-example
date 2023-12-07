import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  async login(credentials: AuthDto): Promise<any> {
    return `Your email is ${credentials.email}`;
  }

  async signUp(): Promise<any> {
    return 'signup';
  }
}
