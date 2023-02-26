import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { index } from '@middlewares/index';

@Injectable()
export class UserService {
  users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  login()
}
