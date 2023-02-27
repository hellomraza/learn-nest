import { Inject, Injectable } from "@nestjs/common";
import neo4j, { Driver } from "neo4j-driver";
import { NEO4J_CONFIG, NEO4J_DRIVER } from "./neo4j.utils/neo4j.constant";
import { Neo4jConfig } from "./neo4j.utils/neo4j.interface";

@Injectable()
export class Neo4jService {
  constructor(
    @Inject(NEO4J_CONFIG) private readonly config: Neo4jConfig,
    @Inject(NEO4J_DRIVER) private readonly driver: Driver,
  ) {}

  private getDriver() {
    return this.driver;
  }

  private getConfig() {
    return this.config;
  }

  private getReadSession(database?: string) {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: neo4j.session.READ,
    });
  }

  private getWriteSession(database?: string) {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: neo4j.session.WRITE,
    });
  }

  read(cypher: string, params?: any, database?: string) {
    return this.getReadSession(database).run(cypher, params);
  }

  write(cypher: string, params?: any, database?: string) {
    return this.getWriteSession(database).run(cypher, params);
  }
}
