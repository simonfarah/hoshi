import 'server-only';
import { type MySql2Database, drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { env } from '#/env';
import * as schema from '#/server/db/schema';

declare global {
  // eslint-disable-next-line no-var -- only var works here
  var drizzle: MySql2Database<typeof schema> | undefined;
}

const dbInstance =
  global.drizzle ??
  drizzle(
    mysql.createPool({
      uri: env.DATABASE_URL,
    }),
    { schema, mode: 'default' },
  );

if (env.NODE_ENV === 'development') global.drizzle = dbInstance;

export const db = dbInstance;
