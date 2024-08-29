CREATE SCHEMA IF NOT EXISTS "identity";

CREATE TABLE IF NOT EXISTS "identity"."user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email_address" varchar NOT NULL,
	"email_confirmed" boolean NOT NULL,
	"username" varchar NOT NULL,
	"password_hash" varchar NOT NULL,
	CONSTRAINT "user_email_address_unique" UNIQUE("email_address"),
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
