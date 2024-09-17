import { Migration } from '@mikro-orm/migrations';

export class Migration20240916231719 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create schema if not exists "collaboration";');
    this.addSql('alter table "thread_category" drop constraint "thread_category_workspace_id_foreign";');

    this.addSql('alter table "thread_category" drop constraint "thread_category_parent_category_id_foreign";');

    this.addSql('create table "collaboration"."workspace_threads" ("id" uuid not null, "name" varchar(255) not null, constraint "workspace_threads_pkey" primary key ("id"));');

    this.addSql('create table "collaboration"."thread_category" ("id" uuid not null, "name" varchar(255) not null, "workspace_id" uuid not null, "parent_category_id" uuid null, constraint "thread_category_pkey" primary key ("id"));');

    this.addSql('create table "collaboration"."thread" ("id" uuid not null, "name" varchar(255) not null, "workspace_id" uuid not null, constraint "thread_pkey" primary key ("id"));');

    this.addSql('alter table "collaboration"."thread_category" add constraint "thread_category_workspace_id_foreign" foreign key ("workspace_id") references "collaboration"."workspace_threads" ("id") on update cascade;');
    this.addSql('alter table "collaboration"."thread_category" add constraint "thread_category_parent_category_id_foreign" foreign key ("parent_category_id") references "collaboration"."thread_category" ("id") on update cascade on delete set null;');

    this.addSql('alter table "collaboration"."thread" add constraint "thread_workspace_id_foreign" foreign key ("workspace_id") references "collaboration"."workspace_threads" ("id") on update cascade;');

    this.addSql('drop table if exists "workspace_threads" cascade;');

    this.addSql('drop table if exists "thread_category" cascade;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "collaboration"."thread_category" drop constraint "thread_category_workspace_id_foreign";');

    this.addSql('alter table "collaboration"."thread" drop constraint "thread_workspace_id_foreign";');

    this.addSql('alter table "collaboration"."thread_category" drop constraint "thread_category_parent_category_id_foreign";');

    this.addSql('create table "workspace_threads" ("id" uuid not null, "name" varchar(255) not null, constraint "workspace_threads_pkey" primary key ("id"));');

    this.addSql('create table "thread_category" ("id" uuid not null, "name" varchar(255) not null, "workspace_id" uuid not null, "parent_category_id" uuid null, constraint "thread_category_pkey" primary key ("id"));');

    this.addSql('alter table "thread_category" add constraint "thread_category_workspace_id_foreign" foreign key ("workspace_id") references "workspace_threads" ("id") on update cascade;');
    this.addSql('alter table "thread_category" add constraint "thread_category_parent_category_id_foreign" foreign key ("parent_category_id") references "thread_category" ("id") on update cascade on delete set null;');

    this.addSql('drop table if exists "collaboration"."workspace_threads" cascade;');

    this.addSql('drop table if exists "collaboration"."thread_category" cascade;');

    this.addSql('drop table if exists "collaboration"."thread" cascade;');

    this.addSql('drop schema if exists "collaboration";');
  }

}
