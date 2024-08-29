import { pgSchema, uuid, varchar } from 'drizzle-orm/pg-core';
import { organizations } from './organization.schema';
import { InferSelectModel } from 'drizzle-orm';

const schema = pgSchema('organization');

export const members = schema.table('member', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().unique(),
  name: varchar('name').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id),
});

export type MemberSchema = InferSelectModel<typeof members>;
