CREATE TABLE IF NOT EXISTS "email_verification_codes" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"email" varchar(255) NOT NULL,
	"code" varchar(8) NOT NULL,
	"expires_at" timestamp NOT NULL,
	CONSTRAINT "email_verification_codes_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "password_reset_tokens" (
	"id" varchar(40) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"expires_at" timestamp NOT NULL,
	CONSTRAINT "password_reset_tokens_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp,
	"hashed_password" varchar(255),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_verification_codes--user_idx" ON "email_verification_codes" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_verification_codes--email_idx" ON "email_verification_codes" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "password_reset_tokens--user_idx" ON "password_reset_tokens" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions--user_idx" ON "sessions" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users--email_idx" ON "users" ("email");