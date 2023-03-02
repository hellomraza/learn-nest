import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { EncryptionService } from "src/encryption/encryption.service";
import { User } from "src/user/interface/user.interface";
import { UserService } from "src/user/user.service";
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
    const { access_token } = await this.createToken(user);
    return { user, access_token };
  }

  /**
   * @param userDto
   * @description Signs in a user and returns an access_token
   * @returns access_token
   * @throws NotFoundException
   */

  async signin(user: any): Promise<{ access_token: string }> {
    return this.createToken(user);
  }

  /**
   * @param email {string}
   * @param password {string}
   * @description Validates a user and password and returns the user
   * @returns user
   * @throws NotFoundException
   * @throws UnauthorizedException
   */

  async validateUser(email: string, password: string): Promise<any> {
    const user: User | undefined = await this.userService.findByEmail(email);
    const isPasswordValid: boolean | undefined =
      user &&
      (await this.encryptionService.comparePassword(password, user.password));

    if (user && isPasswordValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  /**
   * @param user
   * @description Creates a JWT token for a user
   * @returns access_token
   */

  async createToken(user: ReqUser): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
