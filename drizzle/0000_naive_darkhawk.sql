CREATE TABLE `email_verification_codes` (
	`id` varchar(21) NOT NULL,
	`user_id` varchar(21) NOT NULL,
	`email` varchar(255) NOT NULL,
	`code` varchar(8) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `email_verification_codes_id` PRIMARY KEY(`id`),
	CONSTRAINT `email_verification_codes_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `password_reset_tokens` (
	`id` varchar(40) NOT NULL,
	`user_id` varchar(21) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `password_reset_tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `password_reset_tokens_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(21) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(21) NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_verified` datetime,
	`hashed_password` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE INDEX `user_idx` ON `email_verification_codes` (`user_id`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `email_verification_codes` (`email`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `password_reset_tokens` (`user_id`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);