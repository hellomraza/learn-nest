import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./config/configuration";
import { AuthModule } from "./modules/auth/auth.module";
import { EncryptionModule } from "./modules/encryption/encryption.module";
import { Neo4jModule } from "./modules/neo4j/neo4j.module";
import { TodoModule } from "./modules/todo/todo.module";
import { TokenModule } from "./modules/token/token.module";
import { UserModule } from "./modules/user/user.module";
import { Neo4jConfig } from "./utils/interface";
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
    TodoModule,
    TokenModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes();
  }
}
