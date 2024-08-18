import { UserTable } from '../user/database/user.schema';

export interface Database {
  'identity.user': UserTable;
}
