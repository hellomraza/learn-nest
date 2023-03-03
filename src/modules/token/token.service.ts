import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Tokens } from "src/utils/interface";

type ReqUser = {
  email: string;
  name: string;
  id: string;
};

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  /**
   * @param user {User}
   * @description Creates a JWT Access token and Refresh token for a user
   * @returns access_token and refresh_token
   */

  async createTokens(user: ReqUser): Promise<Tokens> {
    const [access_token, refresh_token] = await Promise.all([
      this.createAccToken(user),
      this.createRefToken(user),
    ]);
    return { access_token, refresh_token };
  }

  /**
   * @param user
   * @description Creates a JWT Access token for a user
   * @returns access_token
   */

  async createAccToken(user: ReqUser): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>("jwt.secret.access"),
      expiresIn: this.configService.get<number>("jwt.expiresIn.access"),
    });
  }

  /**
   * @param user
   * @description Creates a JWT Refresh token for a user
   * @returns refresh_token
   */

  async createRefToken(user: ReqUser): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>("jwt.secret.refresh"),
    });
  }
}
