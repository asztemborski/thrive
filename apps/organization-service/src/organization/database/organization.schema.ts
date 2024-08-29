import { uuid, varchar, pgSchema } from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import { members } from './member.schema';

const schema = pgSchema('organization');

export const organizations = schema.table('organization', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
  iconUrl: varchar('icon_url'),
});

export const organizationsRelations = relations(organizations, ({ many }) => ({
  members: many(members),
}));

export type OrganizationSchema = InferSelectModel<typeof organizations>;
