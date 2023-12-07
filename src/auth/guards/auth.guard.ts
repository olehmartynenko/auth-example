import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const auth = context.switchToHttp().getRequest().headers.authorization;
      const token = auth.split(' ')[1];
      const payload = jwtDecode(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (payload.exp < currentTimestamp) {
        context.switchToHttp().getRequest().headers.set('x-access-token', '');
      }
      return payload.exp > currentTimestamp;
    } catch (error) {
      return false;
    }
  }
}
