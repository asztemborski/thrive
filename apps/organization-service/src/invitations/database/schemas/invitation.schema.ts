import { date, pgSchema, uuid, varchar } from 'drizzle-orm/pg-core';
import { members, organizations } from '../../../organization/database';
import { InferSelectModel, relations } from 'drizzle-orm';

const schema = pgSchema('organization');

export const invitations = schema.table('invitation', {
  id: varchar('code').notNull().primaryKey(),
  organizationId: uuid('organization_id')
    .references(() => organizations.id)
    .notNull(),
  creatorId: uuid('creator_id').notNull(),
  expiresAt: date('expires_at'),
  createdAt: date('created_at'),
});

export const invitationsRelations = relations(invitations, ({ one }) => ({
  organization: one(organizations, {
    fields: [invitations.organizationId],
    references: [organizations.id],
  }),
}));

export type InvitationSchema = InferSelectModel<typeof invitations>;
