import { Migration } from '@mikro-orm/migrations';

export class Migration20240917004034 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "collaboration"."thread" add column "category_id" uuid not null;');
    this.addSql('alter table "collaboration"."thread" add constraint "thread_category_id_foreign" foreign key ("category_id") references "collaboration"."thread_category" ("id") on update cascade;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "collaboration"."thread" drop constraint "thread_category_id_foreign";');

    this.addSql('alter table "collaboration"."thread" drop column "category_id";');
  }

}
