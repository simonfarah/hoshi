import 'server-only';
import { DrizzleMySQLAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia } from 'lucia';
import { env } from '#/env.js';
import { SESSION_EXPIRES_IN } from '#/lib/constants';
import { db } from '#/server/db';
import { type DbUser, sessions, users } from '#/server/db/schema';

const adapter = new DrizzleMySQLAdapter(db, sessions, users);

const cookiePrefix = env.NODE_ENV === 'production' ? '__Secure-' : '';

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: SESSION_EXPIRES_IN,
  sessionCookie: {
    name: cookiePrefix + 'auth-session',
    expires: false,
    attributes: {
      secure: env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      emailVerified: attributes.emailVerified,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DbUser, 'hashedPassword'>;
  }
}
