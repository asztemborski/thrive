ALTER TABLE "organization"."member" ADD COLUMN "is_owner" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "organization"."organization" DROP COLUMN IF EXISTS "owner_id";