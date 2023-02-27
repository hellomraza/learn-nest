import neo4j from "neo4j-driver";
import { Neo4jConfig } from "./neo4j.interface";

export const createDriver = async (config: Neo4jConfig) => {
  const { scheme, host, port, username, password } = config;
  const driver = neo4j.driver(
    `${scheme}://${host}:${port}`,
    neo4j.auth.basic(username, password),
  );
  return driver;
};
