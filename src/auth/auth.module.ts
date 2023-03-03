import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { EncryptionModule } from "src/encryption/encryption.module";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtATStrategy } from "./strategies/jwt.at.strategy";
import { LocalAuthStrategy } from "./strategies/local.auth.strategies";

@Module({
  imports: [UserModule, EncryptionModule, JwtModule.register({})],
  providers: [AuthService, LocalAuthStrategy, JwtATStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
