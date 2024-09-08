import { uuid, varchar, pgSchema } from 'drizzle-orm/pg-core';
import { workspaces } from './workspace.schema';
import { InferSelectModel } from 'drizzle-orm';

const schema = pgSchema('collaboration');

export const roles = schema.table('role', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  workspaceId: uuid('workspace_id').references(() => workspaces.id),
});

export type RoleSchema = InferSelectModel<typeof roles>;
