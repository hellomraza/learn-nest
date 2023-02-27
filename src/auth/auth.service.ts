import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Neo4jService } from "src/neo4j/neo4j.service";
import { SignInDto } from "./dto/auth.signin.dto";
import { SignUpDto } from "./dto/auth.signup.dto";

@Injectable()
export class AuthService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async signup(user: SignUpDto) {
    const { email, password, name } = user;

    const hash = await bcrypt.hash(password, 10);

    const cypher = `
      CREATE (u:User {email: $email, password: $password, name: $name})
      RETURN u
    `;

    const params = { email, password: hash, name };

    const newUser = this.neo4jService.write(cypher, params);

    return { email, name };
  }

  signin(user: SignInDto) {
    console.log(user);
  }
}
