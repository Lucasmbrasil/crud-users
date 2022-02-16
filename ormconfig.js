const config = {
  type: "postgres",
  host: process.env.PG_HOST,
  port: "5432",
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  entities: ["./src/entities/**/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
  logging: false,
};

module.exports = config;
