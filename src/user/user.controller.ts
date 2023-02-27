import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create.user.dto";
import { LoginUserDto } from "./dto/login.user.dto";
import { User } from "./interface/user.interface";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Post("signup")
  create(@Body() user: CreateUserDto): void {
    this.userService.create(user);
  }

  @Post("login")
  login(@Body() user: LoginUserDto): void {
    this.userService.login(user);
  }
}
