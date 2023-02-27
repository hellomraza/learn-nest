import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { CreateUserDto } from "./dto/create.user.dto";
import { LoginUserDto } from "./dto/login.user.dto";
import { User } from "./interface/user.interface";

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  constructor(private readonly authService: AuthService) {}

  create(user: CreateUserDto) {
    const newUser = {
      id: Math.random().toString(),
      ...user,
    };
    this.users.push(newUser);
  }

  login(user: LoginUserDto) {
    this.authService.login(user);
  }

  getUsers(): User[] {
    return this.users;
  }

  findOne(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
