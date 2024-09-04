import { boolean, pgSchema, primaryKey, uuid, varchar } from 'drizzle-orm/pg-core';
import { organizations } from './organization.schema';
import { InferSelectModel, relations } from 'drizzle-orm';

const schema = pgSchema('organization');

export const members = schema.table(
  'member',
  {
    id: uuid('id').notNull(),
    name: varchar('name').notNull(),
    isOwner: boolean('is_owner').notNull().default(false),
    organizationId: uuid('organization_id')
      .references(() => organizations.id)
      .notNull(),
  },
  (table) => ({ pk: primaryKey({ columns: [table.id, table.organizationId] }) }),
);

export const membersRelations = relations(members, ({ one }) => ({
  organization: one(organizations, {
    fields: [members.organizationId],
    references: [organizations.id],
  }),
}));

export type MemberSchema = InferSelectModel<typeof members>;
