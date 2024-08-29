import { uuid, varchar, pgSchema } from 'drizzle-orm/pg-core';
import { organizations } from './organization.schema';
import { InferSelectModel } from 'drizzle-orm';

const schema = pgSchema('organization');

export const roles = schema.table('role', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id),
});

export type RoleSchema = InferSelectModel<typeof roles>;
