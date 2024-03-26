import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from '#/server/db/schema';

async function runMigrate() {
  const connection = postgres(process.env.DATABASE_URL!, {
    ssl: 'require',
    max: 1,
  });
  const db = drizzle(connection, { schema });

  console.log('⏳ Running migrations...');

  const start = Date.now();

  await migrate(db, { migrationsFolder: 'drizzle' });

  const end = Date.now();

  console.log(`✅ Migrations completed in ${end - start}ms`);

  process.exit(0);
}

runMigrate().catch((err) => {
  console.error('❌ Migration failed');
  console.error(err);
  process.exit(1);
});
