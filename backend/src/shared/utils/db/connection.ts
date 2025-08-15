// backend/src/db/connection.ts
import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql'; // Using the PostgreSQL driver

let orm: MikroORM<PostgreSqlDriver>;

export const initORM = async () => {
  orm = await MikroORM.init({
    // Entity paths for compiled JS (for production) and TS (for development)
    entities: ['dist/shared/types/*.js'],
    entitiesTs: ['src/shared/types/*.ts'],
    // Connects using the connection string from your .env file
    clientUrl: process.env.DB_CONNECTION_STRING,
    driver: PostgreSqlDriver,
    debug: process.env.NODE_ENV !== 'production',
    // Important: Enables the required SSL connection for cloud databases
    driverOptions: {
      connection: {
        ssl: true,
      },
    },
  });

  // Automatically updates the database schema to match your entities
  await orm.getSchemaGenerator().updateSchema();
  return orm;
};

export const getORM = () => {
  if (!orm) {
    throw new Error('MikroORM has not been initialized. Call initORM first.');
  }
  return orm;
};