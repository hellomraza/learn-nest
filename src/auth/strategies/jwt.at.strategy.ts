import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { User } from "src/utils/interface/user.interface";
@Injectable()
export class JwtATStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>("jwt.secret.access"),
    });
  }

  async validate(payload: any) {
    const user: User | undefined = await this.userService.findByEmail(
      payload.email,
    );

    if (!user) throw new UnauthorizedException();

    return user;
  }
}