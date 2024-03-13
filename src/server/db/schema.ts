import {
  datetime,
  index,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

// users
export const users = mysqlTable(
  'users',
  {
    id: varchar('id', { length: 21 }).primaryKey(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    emailVerified: datetime('email_verified'),
    hashedPassword: varchar('hashed_password', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
  },
  (t) => ({
    emailIdx: index('email_idx').on(t.email),
  }),
);

export type DbUser = typeof users.$inferSelect;
export type DbNewUser = typeof users.$inferInsert;

// sessions
export const sessions = mysqlTable(
  'sessions',
  {
    id: varchar('id', { length: 255 }).primaryKey(),
    userId: varchar('user_id', { length: 21 }).notNull(),
    expiresAt: datetime('expires_at').notNull(),
  },
  (t) => ({
    userIdx: index('user_idx').on(t.userId),
  }),
);

export type DbSession = typeof sessions.$inferSelect;
export type DbNewSession = typeof sessions.$inferInsert;

// email verification codes
export const emailVerificationCodes = mysqlTable(
  'email_verification_codes',
  {
    id: varchar('id', { length: 21 }).primaryKey(),
    userId: varchar('user_id', { length: 21 }).unique().notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    code: varchar('code', { length: 8 }).notNull(),
    expiresAt: datetime('expires_at').notNull(),
  },
  (t) => ({
    userIdx: index('user_idx').on(t.userId),
    emailIdx: index('email_idx').on(t.email),
  }),
);

export type DbEmailVerificationCode =
  typeof emailVerificationCodes.$inferSelect;
export type DbNewEmailVerificationCode =
  typeof emailVerificationCodes.$inferInsert;

// password reset tokens
export const passwordResetTokens = mysqlTable(
  'password_reset_tokens',
  {
    id: varchar('id', { length: 40 }).primaryKey(),
    userId: varchar('user_id', { length: 21 }).unique().notNull(),
    expiresAt: datetime('expires_at').notNull(),
  },
  (t) => ({
    userIdx: index('user_idx').on(t.userId),
  }),
);

export type DbPasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type DbNewPasswordResetToken = typeof passwordResetTokens.$inferInsert;
