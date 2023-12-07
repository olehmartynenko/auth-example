import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async me(): Promise<any> {
    return 'me';
  }

  async editUser(userId: number): Promise<any> {
    return `editUser ${userId}`;
  }
}
