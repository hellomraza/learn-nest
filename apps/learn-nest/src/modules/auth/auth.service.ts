import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { Tokens, User } from "src/utils/interface";
import { EncryptionService } from "../encryption/encryption.service";
import { Neo4jService } from "../neo4j/neo4j.service";
import { TokenService } from "../token/token.service";
import { UserService } from "../user/user.service";
import { SignUpDto } from "./dto";

interface UserWithoutPassword extends Omit<User, "password"> {}
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptionService: EncryptionService,
    private readonly tokenService: TokenService,
    private readonly neo4jService: Neo4jService,
  ) {}

  /**
   * @param userDto
   * @description Creates a new user
   * @returns access_token and user
   */

  async signup(userDto: SignUpDto): Promise<Tokens> {
    const { email, password, name } = userDto;
    const user: User = await this.userService.create({ email, password, name });
    const tokens = await this.tokenService.createTokens(user);
    await this.updateRefToken(user.id, tokens.refresh_token);
    return tokens;
  }

  /**
   * @param userDto
   * @description Signs in a user and returns an access_token
   * @returns access_token
   * @throws NotFoundException
   */

  async signin(user: any): Promise<Tokens> {
    const tokens = await this.tokenService.createTokens(user);
    await this.updateRefToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: string): Promise<boolean> {
    const cypher = `
      MATCH (u:User {id: $userId})
      SET  u.hash_ref_token = NULL
      RETURN u
    `;

    await this.neo4jService.write(cypher, { userId });

    return true;
  }

  async refreshTokens({ user, refreshToken }: any): Promise<string> {
    const isRefreshTokenValid: boolean | undefined =
      await this.encryptionService.compare(refreshToken, user.hash_ref_token);

    if (!isRefreshTokenValid) throw new UnauthorizedException("Invalid token");

    const { refresh_token } = await this.tokenService.createTokens(user);
    await this.updateRefToken(user.id, refresh_token);
    return refresh_token;
  }

  /**
   * @param user
   * @description Returns the user
   * @returns user
   */

  async getUser(userId: string): Promise<UserWithoutPassword> {
    const user = (await this.userService.findById(userId)) as User;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
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

    if (!user) throw new NotFoundException("User not found");

    const isPasswordValid: boolean | undefined =
      await this.encryptionService.compare(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException("Invalid credentials");

    return user;
  }

  async updateRefToken(id: string, refresh_token: string): Promise<void> {
    const hashedRefToken = await this.encryptionService.hash(refresh_token);

    const cypher = `
      MATCH (u:User {id: $id})
      SET u.hash_ref_token = $hash_ref_token
      RETURN u
    `;

    const params = { id, hash_ref_token: hashedRefToken };
    await this.neo4jService.write(cypher, params);
  }
}
