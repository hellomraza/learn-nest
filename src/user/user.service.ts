import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { User } from "./interface/user.interface";
import { SignInDto } from "src/auth/dto/auth.signin.dto";
import { SignUpDto } from "src/auth/dto/auth.signup.dto";
import { Neo4jService } from "src/neo4j/neo4j.service";
import { EncryptionService } from "src/encryption/encryption.service";

@Injectable()
export class UserService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    const cypher = `
      MATCH (u:User {email: $email})
      RETURN u
    `;
    const params = { email };
    const result = await this.neo4jService.read(cypher, params);
    const user = result.records[0]?.get(0)?.properties;

    return user;
  }

  async create(user: SignUpDto): Promise<User> {
    const { email, password, name } = user;
    const hashedPassword = await this.encryptionService.hashPassword(password);

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
