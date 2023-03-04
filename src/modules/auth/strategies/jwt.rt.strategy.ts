import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/modules/user/user.service";
import { User } from "src/utils/interface/";

@Injectable()
export class JwtRTStrategy extends PassportStrategy(Strategy, "jwt-rt") {
  constructor(
    config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>("jwt.refresh_secret"),
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: any,
  ): Promise<{ user: User; refreshToken: string }> {
    const user: User | undefined = await this.userService.findByEmail(
      payload.email,
    );

    if (!user) throw new NotFoundException("User not found");

    const refreshToken = req?.headers?.authorization?.split(" ")[1];

    if (!refreshToken) throw new UnauthorizedException();

    return {
      user,
      refreshToken,
    };
  }
}
