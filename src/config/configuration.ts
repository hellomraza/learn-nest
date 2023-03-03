export default () => {
  return {
    port: process.env.PORT || 3000,
    neo4j: {
      username: process.env.NEO4J_USERNAME,
      password: process.env.NEO4J_PASSWORD,
      scheme: process.env.NEO4J_SCHEME,
      host: process.env.NEO4J_HOST,
      noe4jPort: process.env.NEO4J_PORT,
    },
    jwt: {
      secret: {
        access: process.env.JWT_SECRET_ACCESS,
        refresh: process.env.JWT_SECRET_REFRESH,
      },
      expiresIn: process.env.JWT_EXPIRES_IN || 3600,
    },
  };
};
