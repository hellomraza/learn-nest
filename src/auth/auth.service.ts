import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { EncryptionService } from "src/encryption/encryption.service";
import { Neo4jService } from "src/neo4j/neo4j.service";
import { User } from "src/user/interface/user.interface";
import { UserService } from "src/user/user.service";
import { SignInDto } from "./dto/auth.signin.dto";
import { SignUpDto } from "./dto/auth.signup.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly userService: UserService,
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userDto: SignUpDto) {
    const { email, password, name } = userDto;
    const user: User = await this.userService.create({ email, password, name });
    const { access_token } = await this.createToken(user);
    return { user, access_token };
  }

  signin(user: SignInDto) {
    console.log(user);
  }

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

  async createToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
