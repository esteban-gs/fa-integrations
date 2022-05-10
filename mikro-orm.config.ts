import { Connection, IDatabaseDriver, LoadStrategy } from '@mikro-orm/core';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

enum ConfigKeys {
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_USER = 'DB_USER',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_NAME = 'DB_NAME',
  DB_DEBUG = 'DB_DEBUG',
}

/**
 * This is set up this way because mikro-orm cli looks for this file
 */
const config:
  | MikroOrmModuleOptions<IDatabaseDriver<Connection>>
  | Promise<MikroOrmModuleOptions<IDatabaseDriver<Connection>>> = {
  type: 'postgresql',
  host: process.env[ConfigKeys.DB_HOST],
  port: parseInt(process.env[ConfigKeys.DB_PORT]),
  user: process.env[ConfigKeys.DB_USER],
  password: process.env[ConfigKeys.DB_PASSWORD],
  dbName: process.env[ConfigKeys.DB_NAME],
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: process.env[ConfigKeys.DB_DEBUG] === 'true',
  loadStrategy: LoadStrategy.JOINED,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  registerRequestContext: false,
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
};
console.log(config);
export default { ...config };
