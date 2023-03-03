import { Module } from "@nestjs/common";
import { EncryptionModule } from "src/modules/encryption/encryption.module";
import { TokenModule } from "src/modules/token/token.module";
import { UserModule } from "src/modules/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtATStrategy } from "./strategies/jwt.at.strategy";
import { JwtRTStrategy } from "./strategies/jwt.rt.strategy";
import { LocalAuthStrategy } from "./strategies/local.auth.strategies";

@Module({
  imports: [UserModule, EncryptionModule, TokenModule],
  providers: [AuthService, LocalAuthStrategy, JwtATStrategy, JwtRTStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
