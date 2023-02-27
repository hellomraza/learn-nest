import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  signup() {
    return "signup";
  }

  signin() {
    return "signin";
  }

  validateToken(token: string) {
    return this.jwtService.verify(token);
  }
}
