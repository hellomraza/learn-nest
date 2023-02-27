import { Controller, Get } from "@nestjs/common";
import { User } from "./interface/user.interface";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }
}
