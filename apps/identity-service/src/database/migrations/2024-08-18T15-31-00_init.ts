import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema.createSchema('identity').execute();

  await db.schema
    .createTable('identity.user')
    .addColumn('id', 'uuid', (col) => col.primaryKey())
    .addColumn('email_address', 'varchar', (col) => col.notNull())
    .addColumn('email_confirmed', 'boolean')
    .addColumn('username', 'varchar', (col) => col.notNull())
    .addColumn('password_hash', 'varchar', (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable('identity.user').execute();
  await db.schema.dropSchema('identity').execute();
}
