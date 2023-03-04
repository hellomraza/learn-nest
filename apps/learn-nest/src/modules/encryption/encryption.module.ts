import { Module } from "@nestjs/common";
import { Global } from "@nestjs/common/decorators";
import { EncryptionService } from "./encryption.service";

@Global()
@Module({
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class EncryptionModule {}
