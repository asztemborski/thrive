import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema.createSchema('organization').execute();

  await db.schema
    .createTable('organization.organization')
    .addColumn('id', 'uuid', (col) => col.primaryKey())
    .addColumn('name', 'varchar(20)', (col) => col.notNull())
    .addColumn('description', 'varchar', (col) => col.notNull())
    .addColumn('owner_id', 'uuid', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('organization.member')
    .addColumn('id', 'uuid', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('user_id', 'uuid', (col) => col.notNull())
    .addColumn('organization_id', 'uuid', (col) =>
      col.notNull().references('organization.organization.id').onDelete('cascade').notNull(),
    )
    .execute();

  await db.schema
    .createTable('organization.role')
    .addColumn('id', 'uuid', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('organization_id', 'uuid', (col) =>
      col.references('organization.organization.id').onDelete('cascade').notNull(),
    )
    .execute();

  await db.schema
    .createTable('organization.permission')
    .addColumn('name', 'varchar', (col) => col.primaryKey())
    .execute();

  await db.schema
    .createTable('organization.role_permission')
    .addColumn('role_id', 'uuid', (col) => col.references('organization.role.id').notNull())
    .addColumn('permission', 'varchar', (col) =>
      col.references('organization.permission.name').notNull(),
    )
    .addPrimaryKeyConstraint('primary_key', ['role_id', 'permission'])
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropSchema('organization').execute();
}
