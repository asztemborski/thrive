import { boolean, pgSchema, uuid, varchar } from 'drizzle-orm/pg-core';
import { organizations } from './organization.schema';
import { InferSelectModel, relations } from 'drizzle-orm';

const schema = pgSchema('organization');

export const members = schema.table('member', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  name: varchar('name').notNull(),
  isOwner: boolean('is_owner').notNull().default(false),
  organizationId: uuid('organization_id').references(() => organizations.id),
});

export const membersRelations = relations(members, ({ one }) => ({
  organization: one(organizations, {
    fields: [members.organizationId],
    references: [organizations.id],
  }),
}));

export type MemberSchema = InferSelectModel<typeof members>;
