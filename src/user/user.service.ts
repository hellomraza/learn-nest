import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { User } from "./interface/user.interface";

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  constructor(private readonly authService: AuthService) {}

  getUsers(): User[] {
    return this.users;
  }

  findOne(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
