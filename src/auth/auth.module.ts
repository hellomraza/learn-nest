import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { EncryptionModule } from "src/encryption/encryption.module";

@Module({
  imports: [UserModule, EncryptionModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
