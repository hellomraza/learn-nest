import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { User } from "src/user/interface/user.interface";

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "password",
    });
  }

  async validate(email: string, password: string): Promise<User | any> {
    const user: User | undefined = await this.authService.validateUser(
      email,
      password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
