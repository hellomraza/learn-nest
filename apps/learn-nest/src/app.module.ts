import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TokenModule } from "../../auth/src/token/token.module";
import configuration from "./config/configuration";
import { Neo4jModule } from "@app/common";
import { UserModule } from "../../auth/src/user/user.module";
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
    UserModule,
    TokenModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes();
  }
}
