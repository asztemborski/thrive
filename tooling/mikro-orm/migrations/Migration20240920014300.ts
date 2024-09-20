import { Migration } from '@mikro-orm/migrations';

export class Migration20240920014300 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create schema if not exists "identity";`);
    this.addSql(`create schema if not exists "collaboration";`);
    this.addSql(`create table "identity"."user" ("id" uuid not null, "username" text not null, "email_address" varchar(255) not null, "email_is_verified" boolean not null, "password" varchar(255) not null, constraint "user_pkey" primary key ("id"));`);
    this.addSql(`alter table "identity"."user" add constraint "user_email_address_unique" unique ("email_address");`);

    this.addSql(`create table "collaboration"."workspace" ("id" uuid not null, "name" varchar(255) not null, "description" text not null, constraint "workspace_pkey" primary key ("id"));`);

    this.addSql(`create table "collaboration"."member" ("id" uuid not null, "workspace_id" uuid not null, "name" varchar(255) not null, constraint "member_pkey" primary key ("id", "workspace_id"));`);

    this.addSql(`create table "collaboration"."workspace_threads" ("id" uuid not null, constraint "workspace_threads_pkey" primary key ("id"));`);

    this.addSql(`create table "collaboration"."thread_category" ("id" uuid not null, "name" varchar(255) not null, "workspace_id" uuid not null, "parent_category_id" uuid null, constraint "thread_category_pkey" primary key ("id"));`);

    this.addSql(`create table "collaboration"."thread" ("id" uuid not null, "name" varchar(255) not null, "workspace_id" uuid not null, "category_id" uuid null, constraint "thread_pkey" primary key ("id"));`);

    this.addSql(`alter table "collaboration"."member" add constraint "member_workspace_id_foreign" foreign key ("workspace_id") references "collaboration"."workspace" ("id") on update cascade;`);

    this.addSql(`alter table "collaboration"."thread_category" add constraint "thread_category_workspace_id_foreign" foreign key ("workspace_id") references "collaboration"."workspace_threads" ("id") on update cascade;`);
    this.addSql(`alter table "collaboration"."thread_category" add constraint "thread_category_parent_category_id_foreign" foreign key ("parent_category_id") references "collaboration"."thread_category" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "collaboration"."thread" add constraint "thread_workspace_id_foreign" foreign key ("workspace_id") references "collaboration"."workspace_threads" ("id") on update cascade;`);
    this.addSql(`alter table "collaboration"."thread" add constraint "thread_category_id_foreign" foreign key ("category_id") references "collaboration"."thread_category" ("id") on update cascade on delete set null;`);
  }

}
