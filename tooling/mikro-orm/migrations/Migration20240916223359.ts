import { Migration } from '@mikro-orm/migrations';

export class Migration20240916223359 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "wow" drop constraint "wow_pkey";');

    this.addSql('alter table "wow" rename column "id" to "_id";');
    this.addSql('alter table "wow" rename column "name" to "_name";');
    this.addSql('alter table "wow" add constraint "wow_pkey" primary key ("_id");');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "wow" drop constraint "wow_pkey";');

    this.addSql('alter table "wow" rename column "_id" to "id";');
    this.addSql('alter table "wow" rename column "_name" to "name";');
    this.addSql('alter table "wow" add constraint "wow_pkey" primary key ("id");');
  }

}
