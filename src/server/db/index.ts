import 'server-only';
import { Pool } from '@neondatabase/serverless';
import { type NeonDatabase, drizzle } from 'drizzle-orm/neon-serverless';
import { env } from '#/env';
import * as schema from '#/server/db/schema';

declare global {
  // eslint-disable-next-line no-var -- only var works here
  var drizzle: NeonDatabase<typeof schema> | undefined;
}

const dbInstance =
  global.drizzle ??
  drizzle(
    new Pool({
      connectionString: env.DATABASE_URL,
    }),
    { schema },
  );

if (env.NODE_ENV === 'development') global.drizzle = dbInstance;

export const db = dbInstance;
