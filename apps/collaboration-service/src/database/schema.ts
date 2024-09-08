import * as memberSchema from '../workspace/database/member.schema';
import * as workspaceSchema from '../workspace/database/workspace.schema';
import * as roleSchema from '../workspace/database/role.schema';
import * as permissionSchema from '../workspace/database/permission.schema';
import * as roleToPermissionSchema from '../workspace/database/role-to-permission.schema';

import * as invitationSchema from '../invitation/database/schemas/invitation.schema';

import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

type DatabaseSchema = typeof memberSchema &
  typeof workspaceSchema &
  typeof roleSchema &
  typeof permissionSchema &
  typeof roleToPermissionSchema &
  typeof invitationSchema;

export type Database = PostgresJsDatabase<DatabaseSchema>;

export const schema = {
  ...memberSchema,
  ...workspaceSchema,
  ...roleSchema,
  ...permissionSchema,
  ...roleToPermissionSchema,
  ...invitationSchema,
};
