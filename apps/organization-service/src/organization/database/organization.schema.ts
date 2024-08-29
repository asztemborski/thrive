import { uuid, varchar, pgSchema } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';

const schema = pgSchema('organization');

export const organizations = schema.table('organization', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
  iconUrl: varchar('icon_url'),
  ownerId: uuid('owner_id').notNull(),
});

export type OrganizationSchema = InferSelectModel<typeof organizations>;
