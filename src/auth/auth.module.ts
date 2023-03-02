import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { EncryptionModule } from "src/encryption/encryption.module";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalAuthStrategy } from "./strategies/local.auth.strategies";

@Module({
  imports: [
    UserModule,
    EncryptionModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>("jwt.secret"),
        signOptions: {
          expiresIn: config.get<string>("JWT_EXPIRATION", "1d"),
        },
      }),
    }),
  ],
  providers: [AuthService, LocalAuthStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
