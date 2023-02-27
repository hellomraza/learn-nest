import { DynamicModule, Module } from "@nestjs/common";
import { Neo4jService } from "./neo4j.service";
import { NEO4J_CONFIG, NEO4J_DRIVER } from "./neo4j.utils/neo4j.constant";
import { Neo4jConfig } from "./neo4j.utils/neo4j.interface";
import { createDriver } from "./neo4j.utils/neo4j.utils";

@Module({})
export class Neo4jModule {
  static forRoot(useValue: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      providers: [
        Neo4jService,
        { provide: NEO4J_CONFIG, useValue },
        {
          provide: NEO4J_DRIVER,
          inject: [NEO4J_CONFIG],
          useFactory: async (config: Neo4jConfig) => createDriver(config),
        },
      ],
      exports: [Neo4jService],
    };
  }
}
