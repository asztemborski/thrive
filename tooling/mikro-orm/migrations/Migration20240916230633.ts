import { Migration } from '@mikro-orm/migrations';

export class Migration20240916230633 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "thread_category" ("id" uuid not null, "name" varchar(255) not null, "_workspace_id_id" uuid not null, "_parent_category_id_id" uuid null, constraint "thread_category_pkey" primary key ("id"));');

    this.addSql('alter table "thread_category" add constraint "thread_category__workspace_id_id_foreign" foreign key ("_workspace_id_id") references "workspace_threads" ("id") on update cascade;');
    this.addSql('alter table "thread_category" add constraint "thread_category__parent_category_id_id_foreign" foreign key ("_parent_category_id_id") references "thread_category" ("id") on update cascade on delete set null;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "thread_category" drop constraint "thread_category__parent_category_id_id_foreign";');

    this.addSql('drop table if exists "thread_category" cascade;');
  }

}
