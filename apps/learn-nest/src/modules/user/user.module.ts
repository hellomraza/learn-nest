import { Module } from "@nestjs/common";
import { EncryptionModule } from "src/modules/encryption/encryption.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [EncryptionModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
