import { Migration } from '@mikro-orm/migrations';

export class Migration20240916230731 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "thread_category" drop constraint "thread_category__workspace_id_id_foreign";');
    this.addSql('alter table "thread_category" drop constraint "thread_category__parent_category_id_id_foreign";');

    this.addSql('alter table "thread_category" rename column "_workspace_id_id" to "workspace_id";');
    this.addSql('alter table "thread_category" rename column "_parent_category_id_id" to "parent_category_id";');
    this.addSql('alter table "thread_category" add constraint "thread_category_workspace_id_foreign" foreign key ("workspace_id") references "workspace_threads" ("id") on update cascade;');
    this.addSql('alter table "thread_category" add constraint "thread_category_parent_category_id_foreign" foreign key ("parent_category_id") references "thread_category" ("id") on update cascade on delete set null;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "thread_category" drop constraint "thread_category_workspace_id_foreign";');
    this.addSql('alter table "thread_category" drop constraint "thread_category_parent_category_id_foreign";');

    this.addSql('alter table "thread_category" rename column "workspace_id" to "_workspace_id_id";');
    this.addSql('alter table "thread_category" rename column "parent_category_id" to "_parent_category_id_id";');
    this.addSql('alter table "thread_category" add constraint "thread_category__workspace_id_id_foreign" foreign key ("_workspace_id_id") references "workspace_threads" ("id") on update cascade;');
    this.addSql('alter table "thread_category" add constraint "thread_category__parent_category_id_id_foreign" foreign key ("_parent_category_id_id") references "thread_category" ("id") on update cascade on delete set null;');
  }

}
