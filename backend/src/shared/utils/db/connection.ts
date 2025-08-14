// backend/src/db/connection.ts
import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';

let orm: MikroORM<SqliteDriver>;

export const initORM = async () => {
  orm = await MikroORM.init({
    // Fix the entity paths to be relative to the project root
    entities: ['src/shared/types/*.ts'],
    entitiesTs: ['src/shared/types/*.ts'], 
    dbName: 'request-history.sqlite3',
    driver: SqliteDriver,
    debug: process.env.NODE_ENV !== 'production',
  });
  
  // This helps ensure the database schema is up-to-date with your entities
  await orm.getSchemaGenerator().updateSchema();

  return orm;
};

export const getORM = () => {
  if (!orm) {
    throw new Error('MikroORM has not been initialized. Call initORM first.');
  }
  return orm;
};