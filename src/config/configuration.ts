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
      access_secret: process.env.JWT_ACCESS_SECRET,
      refresh_secret: process.env.JWT_REFRESH_SECRET,
      access_expiresIn: process.env.JWT_EXPIRES_IN_ACCESS,
      refresh_expiresIn: process.env.JWT_EXPIRES_IN_REFRESH,
    },
  };
};
