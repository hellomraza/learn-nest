import { Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy, "local") {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "password",
    });
  }

  /**
   * @param email {string}
   * @param password {string}
   * @description Validates a user and password and returns the user
   * @returns user
   */

  async validate(
    email: string,
    password: string,
  ): Promise<{ email: string; name: string; id: string }> {
    const user = await this.authService.validateUser(email, password);

    if (!user) throw new UnauthorizedException("Invalid credentials");

    return {
      email: user.email,
      name: user.name,
      id: user.id,
    };
  }
}
