import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { User } from "./interface/user.interface";
import { SignInDto } from "src/auth/dto/auth.signin.dto";
import { SignUpDto } from "src/auth/dto/auth.signup.dto";
import { Neo4jService } from "src/neo4j/neo4j.service";

@Injectable()
export class UserService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async create(user: SignUpDto): Promise<User> {
    const { email, password, name } = user;
    const cypher = `
      CREATE (u:User {email: $email, password: $password, name: $name, id: randomUUID()})
      RETURN u
    `;
    const params = { email, password, name };
    const result = await this.neo4jService.write(cypher, params);
    const newUser = result.records[0].get(0).properties;

    return newUser;
  }
}
