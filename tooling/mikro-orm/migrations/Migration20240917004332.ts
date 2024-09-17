import { Migration } from '@mikro-orm/migrations';

export class Migration20240917004332 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "collaboration"."thread" drop constraint "thread_category_id_foreign";');

    this.addSql('alter table "collaboration"."thread" alter column "category_id" drop default;');
    this.addSql('alter table "collaboration"."thread" alter column "category_id" type uuid using ("category_id"::text::uuid);');
    this.addSql('alter table "collaboration"."thread" alter column "category_id" drop not null;');
    this.addSql('alter table "collaboration"."thread" add constraint "thread_category_id_foreign" foreign key ("category_id") references "collaboration"."thread_category" ("id") on update cascade on delete set null;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "collaboration"."thread" drop constraint "thread_category_id_foreign";');

    this.addSql('alter table "collaboration"."thread" alter column "category_id" drop default;');
    this.addSql('alter table "collaboration"."thread" alter column "category_id" type uuid using ("category_id"::text::uuid);');
    this.addSql('alter table "collaboration"."thread" alter column "category_id" set not null;');
    this.addSql('alter table "collaboration"."thread" add constraint "thread_category_id_foreign" foreign key ("category_id") references "collaboration"."thread_category" ("id") on update cascade;');
  }

}
