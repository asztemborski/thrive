import { uuid, varchar, pgSchema } from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import { members } from './member.schema';

const schema = pgSchema('collaboration');

export const workspaces = schema.table('workspace', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
  iconUrl: varchar('icon_url'),
});

export const workspacesRelations = relations(workspaces, ({ many }) => ({
  members: many(members),
}));

export type WorkspaceSchema = InferSelectModel<typeof workspaces>;
