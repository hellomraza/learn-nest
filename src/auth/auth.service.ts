import { Injectable } from "@nestjs/common";
import { Neo4jService } from "src/neo4j/neo4j.service";
import { SignInDto } from "./dto/auth.signin.dto";
import { SignUpDto } from "./dto/auth.signup.dto";
import { UserService } from "src/user/user.service";
import { EncryptionService } from "src/encryption/encryption.service";
import { User } from "src/user/interface/user.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly userService: UserService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async signup(user: SignUpDto) {
    const { email, password, name } = user;
    return await this.userService.create({ email, password, name });
  }

  signin(user: SignInDto) {
    console.log(user);
  }

  getUser() {
    return this.neo4jService.read("MATCH (u:User) RETURN u");
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
}
