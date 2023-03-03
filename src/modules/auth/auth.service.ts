import { Injectable } from "@nestjs/common";
import { EncryptionService } from "src/modules/encryption/encryption.service";
import { TokenService } from "src/modules/token/token.service";
import { UserService } from "src/modules/user/user.service";
import { Tokens, User } from "src/utils/interface";
import { SignUpDto } from "./dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptionService: EncryptionService,
    private readonly tokenService: TokenService,
  ) {}

  /**
   * @param userDto
   * @description Creates a new user
   * @returns access_token and user
   */

  async signup(userDto: SignUpDto): Promise<{ user: User; tokens: Tokens }> {
    const { email, password, name } = userDto;
    const user: User = await this.userService.create({ email, password, name });
    const { access_token, refresh_token } =
      await this.tokenService.createTokens(user);
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
    return await this.tokenService.createTokens(user);
  }

  getUser(user: any): User {
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
}
