import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { EncryptionService } from "src/encryption/encryption.service";
import { UserService } from "src/user/user.service";
import { User } from "src/utils/interface/user.interface";
import { SignUpDto } from "./dto/auth.signup.dto";

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

  async signup(
    userDto: SignUpDto,
  ): Promise<{ user: User; access_token: string }> {
    const { email, password, name } = userDto;
    const user: User = await this.userService.create({ email, password, name });
    const { access_token } = await this.createAccToken(user);
    return { user, access_token };
  }

  /**
   * @param userDto
   * @description Signs in a user and returns an access_token
   * @returns access_token
   * @throws NotFoundException
   */

  async signin(user: any): Promise<{ access_token: string }> {
    return this.createAccToken(user);
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

  async createAccToken(user: ReqUser): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>("jwt.secret.access"),
      }),
    };
  }

  /**
   * @param user
   * @description Creates a JWT Refresh token for a user
   * @returns refresh_token
   */

  async createRefToken(user: ReqUser): Promise<{ refresh_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      refresh_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>("jwt.secret.refresh"),
      }),
    };
  }
}
