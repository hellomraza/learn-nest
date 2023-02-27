import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { EncryptionModule } from "src/encryption/encryption.module";
import { AuthStrategy } from "./auth.strategy";

@Module({
  imports: [UserModule, EncryptionModule],
  providers: [AuthService, AuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
