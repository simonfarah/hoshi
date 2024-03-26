import { index, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

// users
export const users = pgTable(
  'users',
  {
    id: varchar('id', { length: 21 }).primaryKey(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    emailVerified: timestamp('email_verified'),
    hashedPassword: varchar('hashed_password', { length: 255 }),
  },
  (t) => ({
    emailIdx: index('users--email_idx').on(t.email),
  }),
);

export type DbUser = typeof users.$inferSelect;
export type DbNewUser = typeof users.$inferInsert;

// sessions
export const sessions = pgTable(
  'sessions',
  {
    id: varchar('id', { length: 255 }).primaryKey(),
    userId: varchar('user_id', { length: 21 }).notNull(),
    expiresAt: timestamp('expires_at').notNull(),
  },
  (t) => ({
    userIdx: index('sessions--user_idx').on(t.userId),
  }),
);

export type DbSession = typeof sessions.$inferSelect;
export type DbNewSession = typeof sessions.$inferInsert;

// email verification codes
export const emailVerificationCodes = pgTable(
  'email_verification_codes',
  {
    id: varchar('id', { length: 21 }).primaryKey(),
    userId: varchar('user_id', { length: 21 }).unique().notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    code: varchar('code', { length: 8 }).notNull(),
    expiresAt: timestamp('expires_at').notNull(),
  },
  (t) => ({
    userIdx: index('email_verification_codes--user_idx').on(t.userId),
    emailIdx: index('email_verification_codes--email_idx').on(t.email),
  }),
);

export type DbEmailVerificationCode =
  typeof emailVerificationCodes.$inferSelect;
export type DbNewEmailVerificationCode =
  typeof emailVerificationCodes.$inferInsert;

// password reset tokens
export const passwordResetTokens = pgTable(
  'password_reset_tokens',
  {
    id: varchar('id', { length: 40 }).primaryKey(),
    userId: varchar('user_id', { length: 21 }).unique().notNull(),
    expiresAt: timestamp('expires_at').notNull(),
  },
  (t) => ({
    userIdx: index('password_reset_tokens--user_idx').on(t.userId),
  }),
);

export type DbPasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type DbNewPasswordResetToken = typeof passwordResetTokens.$inferInsert;
