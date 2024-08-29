import { uuid, varchar, pgSchema } from 'drizzle-orm/pg-core';
import { roles } from './role.schema';
import { permissions } from './permission.schema';
import { InferSelectModel } from 'drizzle-orm';

const schema = pgSchema('organization');

export const roleToPermission = schema.table('role_to_permission', {
  roleId: uuid('role_id')
    .notNull()
    .references(() => roles.id),
  permission: varchar('permission')
    .notNull()
    .references(() => permissions.name),
});

export type RoleToPermissionSchema = InferSelectModel<typeof roleToPermission>;
