import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcrypt";
@Injectable()
export class EncryptionService {
  async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return compare(password, hashedPassword);
    } catch (error) {
      return false;
    }
  }
}
