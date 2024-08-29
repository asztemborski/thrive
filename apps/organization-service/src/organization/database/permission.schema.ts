import { varchar, pgSchema } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';

const schema = pgSchema('organization');

export const permissions = schema.table('permission', {
  name: varchar('name').primaryKey(),
});

export type PermissionSchema = InferSelectModel<typeof permissions>;
