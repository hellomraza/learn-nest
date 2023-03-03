import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { EncryptionService } from "src/encryption/encryption.service";
import { UserService } from "src/user/user.service";
import { User } from "src/utils/interface";
import { SignUpDto } from "./dto";
import { Tokens } from "src/utils/interface";

type ReqUser = {
  email: string;
  name: string;
  id: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * @param userDto
   * @description Creates a new user
   * @returns access_token and user
   */

  async signup(userDto: SignUpDto): Promise<{ user: User; tokens: Tokens }> {
    const { email, password, name } = userDto;
    const user: User = await this.userService.create({ email, password, name });
    const [access_token, refresh_token] = await Promise.all([
      this.createAccToken(user),
      this.createRefToken(user),
    ]);
    return { user, tokens: { access_token, refresh_token } };
  }

  /**
   * @param userDto
   * @description Signs in a user and returns an access_token
   * @returns access_token
   * @throws NotFoundException
   */

  async signin(
    user: any,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const [access_token, refresh_token] = await Promise.all([
      this.createAccToken(user),
      this.createRefToken(user),
    ]);
    return { access_token, refresh_token };
  }

  getUser(user: any): any {
    return user;
  }

  /**
   * @param email {string}
   * @param password {string}
   * @description Validates a user and password and returns the user
   * @returns user
   * @throws NotFoundException
   * @throws UnauthorizedException
   */

  async validateUser(email: string, password: string): Promise<User | null> {
    const user: User | undefined = await this.userService.findByEmail(email);
    const isPasswordValid: boolean | undefined =
      user &&
      (await this.encryptionService.comparePassword(password, user.password));

    if (user && isPasswordValid) return user;
    return null;
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
