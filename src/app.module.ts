import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import configuration from "./config/configuration";
import { Neo4jModule } from "./neo4j/neo4j.module";
import { Neo4jConfig } from "./neo4j/neo4j.utils/neo4j.interface";
import { UserModule } from "./user/user.module";
import { EncryptionModule } from './encryption/encryption.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    Neo4jModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): Neo4jConfig => ({
        scheme: configService.get("neo4j.scheme").toString(),
        host: configService.get("neo4j.host").toString(),
        port: configService.get("neo4j.noe4jPort").toString(),
        username: configService.get("neo4j.username").toString(),
        password: configService.get("neo4j.password").toString(),
      }),
    }),

    AuthModule,
    UserModule,
    EncryptionModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes();
  }
}
