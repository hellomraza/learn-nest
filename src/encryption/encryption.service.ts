import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import bcrypt from "bcrypt";

@Injectable()
export class EncryptionService {
  constructor(private readonly configService: ConfigService) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(
      password,
      this.configService.get<number>("HASH_SALT", 10),
    );
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
