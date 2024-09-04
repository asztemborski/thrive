CREATE SCHEMA IF NOT EXISTS "organization";

CREATE TABLE IF NOT EXISTS "organization"."member" (
	"id" uuid NOT NULL,
	"name" varchar NOT NULL,
	"is_owner" boolean DEFAULT false NOT NULL,
	"organization_id" uuid NOT NULL,
	CONSTRAINT "member_id_organization_id_pk" PRIMARY KEY("id","organization_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization"."role_to_permission" (
	"role_id" uuid NOT NULL,
	"permission" varchar NOT NULL,
	CONSTRAINT "role_to_permission_role_id_permission_pk" PRIMARY KEY("role_id","permission")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization"."role" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"organization_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization"."organization" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"icon_url" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization"."permission" (
	"name" varchar PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization"."invitation" (
	"code" varchar PRIMARY KEY NOT NULL,
	"organization_id" uuid NOT NULL,
	"creator_id" uuid NOT NULL,
	"expires_at" date,
	"created_at" date
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization"."member" ADD CONSTRAINT "member_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organization"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization"."role_to_permission" ADD CONSTRAINT "role_to_permission_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "organization"."role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization"."role_to_permission" ADD CONSTRAINT "role_to_permission_permission_permission_name_fk" FOREIGN KEY ("permission") REFERENCES "organization"."permission"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization"."role" ADD CONSTRAINT "role_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organization"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization"."invitation" ADD CONSTRAINT "invitation_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organization"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
