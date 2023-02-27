import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { Neo4jModule } from "./neo4j/neo4j.module";
@Module({
  imports: [
    Neo4jModule.forRoot({
      scheme: "neo4j+s",
      host: "ae77c18b.databases.neo4j.io",
      port: 7687,
      username: "neo4j",
      password: "LKS4WNWpGRarv3QybXjVcYxom8i_JceOBbg84attpS4",
      database: "neo4j",
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
