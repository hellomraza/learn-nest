import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import configuration from "./config/configuration";
import { Neo4jModule } from "./neo4j/neo4j.module";
import { Neo4jConfig } from "./neo4j/neo4j.utils/neo4j.interface";
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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes();
  }
}

// .forRootAsync({
//   scheme: "neo4j+s",
//   host: "ffb82fb1.databases.neo4j.io",
//   port: 7687,
//   username: "neo4j",
//   password: "msUzQq_tTUqh9rQs8SXcjmvXH4aYBmzzWVwpQisyoGI",
//   database: "neo4j",
// })
