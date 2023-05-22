import neo4j, { Driver } from "neo4j-driver";
import { Neo4jConfig } from "@app/common/utils/interface/neo4j.interface";

export const createDriver = async (config: Neo4jConfig) => {
  const { scheme, host, port, username, password, database } = config;
  const driver: Driver = neo4j.driver(
    `${scheme}://${host}:${port}`,
    neo4j.auth.basic(username, password),
  );
  await driver.verifyConnectivity({ database });
  return driver;
};
