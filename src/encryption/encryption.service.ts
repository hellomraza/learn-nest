import { Injectable } from "@nestjs/common";
import { hash, compare } from "bcrypt";
@Injectable()
export class EncryptionService {
  async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
