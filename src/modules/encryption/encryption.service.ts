import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcrypt";
@Injectable()
export class EncryptionService {
  /**
   *
   * @param password
   * @description Hashes a password using bcrypt and returns the hashed password
   * @returns hashed password
   */

  async hash(password: string): Promise<string> {
    return await hash(password, 10);
  }

  /**
   * @param password
   * @description Compares a password with a hashed password and returns true if they match
   * @returns boolean
   */

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await compare(password, hashedPassword);
    } catch (error) {
      return false;
    }
  }
}
