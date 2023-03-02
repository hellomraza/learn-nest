import { Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/utils/interface/user.interface";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy, "local") {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "password",
    });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<{ email: string; name: string; id: string }> {
    const user: User | null = await this.authService.validateUser(
      email,
      password,
    );
    if (!user) throw new UnauthorizedException("Invalid credentials");
    return {
      email: user.email,
      name: user.name,
      id: user.id,
    };
  }
}
