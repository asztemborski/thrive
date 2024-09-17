import { Migration } from '@mikro-orm/migrations';

export class Migration20240916225005 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "workspace_threads" ("id" uuid not null, "name" varchar(255) not null, constraint "workspace_threads_pkey" primary key ("id"));');

    this.addSql('drop table if exists "wow" cascade;');
  }

  override async down(): Promise<void> {
    this.addSql('create table "wow" ("_id" uuid not null, "_name" varchar(255) not null, constraint "wow_pkey" primary key ("_id"));');

    this.addSql('drop table if exists "workspace_threads" cascade;');
  }

}
