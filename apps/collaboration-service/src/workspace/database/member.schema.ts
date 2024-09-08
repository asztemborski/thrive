import { boolean, pgSchema, primaryKey, uuid, varchar } from 'drizzle-orm/pg-core';
import { workspaces } from './workspace.schema';
import { InferSelectModel, relations } from 'drizzle-orm';

const schema = pgSchema('collaboration');

export const members = schema.table(
  'member',
  {
    id: uuid('id').notNull(),
    name: varchar('name').notNull(),
    isOwner: boolean('is_owner').notNull().default(false),
    workspaceId: uuid('workspace_id')
      .references(() => workspaces.id)
      .notNull(),
  },
  (table) => ({ pk: primaryKey({ columns: [table.id, table.workspaceId] }) }),
);

export const membersRelations = relations(members, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [members.workspaceId],
    references: [workspaces.id],
  }),
}));

export type MemberSchema = InferSelectModel<typeof members>;
