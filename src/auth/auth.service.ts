import { Inject, Injectable, Post } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Neo4jService } from "src/neo4j/neo4j.service";
import { SignInDto } from "./dto/auth.signin.dto";
import { SignUpDto } from "./dto/auth.signup.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly userService: UserService,
  ) {}

  async signup(user: SignUpDto) {
    const { email, password, name } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create({
      email,
      password: hashedPassword,
      name,
    });

    return newUser;
  }

  signin(user: SignInDto) {
    console.log(user);
  }

  getUser() {
    return this.neo4jService.read("MATCH (u:User) RETURN u");
  }
}
