import { Migration } from '@mikro-orm/migrations';

export class Migration20240916223324 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "wow" ("id" uuid not null, "name" varchar(255) not null, constraint "wow_pkey" primary key ("id"));');
  }

}
