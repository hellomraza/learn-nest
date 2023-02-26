import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }
}
