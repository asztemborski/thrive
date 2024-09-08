CREATE SCHEMA IF NOT EXISTS "collaboration";

CREATE TABLE IF NOT EXISTS "collaboration"."member" (
	"id" uuid NOT NULL,
	"name" varchar NOT NULL,
	"is_owner" boolean DEFAULT false NOT NULL,
	"workspace_id" uuid NOT NULL,
	CONSTRAINT "member_id_workspace_id_pk" PRIMARY KEY("id","workspace_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collaboration"."role_to_permission" (
	"role_id" uuid NOT NULL,
	"permission" varchar NOT NULL,
	CONSTRAINT "role_to_permission_role_id_permission_pk" PRIMARY KEY("role_id","permission")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collaboration"."role" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"workspace_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collaboration"."workspace" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"icon_url" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collaboration"."permission" (
	"name" varchar PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collaboration"."invitation" (
	"code" varchar PRIMARY KEY NOT NULL,
	"workspace_id" uuid NOT NULL,
	"creator_id" uuid NOT NULL,
	"expires_at" date,
	"created_at" date
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collaboration"."member" ADD CONSTRAINT "member_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "collaboration"."workspace"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collaboration"."role_to_permission" ADD CONSTRAINT "role_to_permission_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "collaboration"."role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collaboration"."role_to_permission" ADD CONSTRAINT "role_to_permission_permission_permission_name_fk" FOREIGN KEY ("permission") REFERENCES "collaboration"."permission"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collaboration"."role" ADD CONSTRAINT "role_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "collaboration"."workspace"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collaboration"."invitation" ADD CONSTRAINT "invitation_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "collaboration"."workspace"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
