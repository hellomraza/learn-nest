import { ConflictException, Injectable } from "@nestjs/common";
import { User } from "../../utils/interface";
import { SignUpDto } from "../auth/dto";
import { EncryptionService } from "../encryption/encryption.service";
import { Neo4jService } from "../neo4j/neo4j.service";

@Injectable()
export class UserService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly encryption: EncryptionService,
  ) {}

  /**
   * @param email {string}
   * @description Finds a user by email
   * @returns user
   */

  async findByEmail(email: string): Promise<User | undefined> {
    const cypher = `MATCH (u:User {email: $email}) RETURN u`;

    const params = { email };
    const result = await this.neo4jService.read(cypher, params);
    const user = result.records[0]?.get(0)?.properties;

    return user;
  }

  /**
   * @param user {SignUpDto}
   * @description Creates a new user
   * @returns user
   */

  async create(user: SignUpDto): Promise<User> {
    const { email, password, name } = user;
    const hashedPassword = await this.encryption.hashPassword(password);

    const cypher = `
      CREATE (u:User)
      SET u += $params, u.id = randomUUID() 
      RETURN u
  `;
    if (await this.findByEmail(email)) {
      throw new ConflictException("User already exists");
    }
    const params = { email, password: hashedPassword, name };
    const result = await this.neo4jService.write(cypher, { params });
    const newUser = result.records[0].get(0).properties;
    return newUser;
  }
}
