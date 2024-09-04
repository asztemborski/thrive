import * as memberSchema from '../organization/database/member.schema';
import * as organizationSchema from '../organization/database/organization.schema';
import * as roleSchema from '../organization/database/role.schema';
import * as permissionSchema from '../organization/database/permission.schema';
import * as roleToPermissionSchema from '../organization/database/role-to-permission.schema';

import * as invitationSchema from '../invitations/database/schemas/invitation.schema';

import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

type DatabaseSchema = typeof memberSchema &
  typeof organizationSchema &
  typeof roleSchema &
  typeof permissionSchema &
  typeof roleToPermissionSchema &
  typeof invitationSchema;

export type Database = PostgresJsDatabase<DatabaseSchema>;

export const schema = {
  ...memberSchema,
  ...organizationSchema,
  ...roleSchema,
  ...permissionSchema,
  ...roleToPermissionSchema,
  ...invitationSchema,
};
