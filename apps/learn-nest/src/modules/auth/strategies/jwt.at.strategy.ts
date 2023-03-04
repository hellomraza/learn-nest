import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/modules/user/user.service";
import { User } from "src/utils/interface";
import { JwtPayLoad } from "src/utils/types/jwtPayload";
@Injectable()
export class JwtATStrategy extends PassportStrategy(Strategy, "jwt-at") {
  constructor(
    config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>("jwt.access_secret"),
    });
  }

  async validate(payload: JwtPayLoad): Promise<JwtPayLoad> {
    const user: User | undefined = await this.userService.findByEmail(
      payload.email,
    );

    if (!user) throw new UnauthorizedException();

    return payload;
  }
}
