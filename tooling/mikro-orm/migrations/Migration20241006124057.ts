import { Migration } from '@mikro-orm/migrations';

export class Migration20241006124057 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "collaboration"."invitation" ("id" uuid not null, "workspace_id" uuid not null, "created_at" timestamptz not null, "created_by" uuid not null, constraint "invitation_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "collaboration"."invitation" cascade;`);
  }

}
