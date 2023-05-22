import { Inject, Injectable } from "@nestjs/common";
import neo4j, { Driver, Result, Session } from "neo4j-driver";
import { Neo4jConfig } from "@app/common/utils/interface/neo4j.interface";
import { NEO4J_CONFIG, NEO4J_DRIVER } from "./neo4j.utils/neo4j.constant";

@Injectable()
export class Neo4jService {
  constructor(
    @Inject(NEO4J_CONFIG) private readonly config: Neo4jConfig,
    @Inject(NEO4J_DRIVER) private readonly driver: Driver,
  ) {}

  /**
   * @returns Driver
   * @description Returns the driver instance of the Neo4jService
   */

  private getDriver(): Driver {
    return this.driver;
  }

  /**
   * @returns Neo4jConfig
   * @description Returns the config instance of the Neo4jService (NEO4J_CONFIG)
   */

  private getConfig(): Neo4jConfig {
    return this.config;
  }

  /**
   * @param database - The database to connect to
   * @returns Session
   * @description Returns a read session for the specified database
   */

  private getReadSession(database?: string): Session {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: neo4j.session.READ,
    });
  }

  /**
   * @param database - The database to connect to
   * @returns Session
   * @description Returns a write session for the specified database
   */

  private getWriteSession(database?: string): Session {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: neo4j.session.WRITE,
    });
  }

  /**
   * @param cypher - The cypher query to run
   * @param params - The parameters to pass to the cypher query
   * @param database - The database to connect to
   * @returns Result
   * @description Runs a cypher query in read mode
   */

  read(cypher: string, params?: any, database?: string): Result {
    return this.getReadSession(database).run(cypher, params);
  }

  /**
   * @param cypher - The cypher query to run
   * @param params - The parameters to pass to the cypher query
   * @param database - The database to connect to
   * @returns Result
   * @description Runs a cypher query in write mode
   */

  write(cypher: string, params?: any, database?: string): Result {
    return this.getWriteSession(database).run(cypher, params);
  }
}
