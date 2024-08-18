import { UserTable } from '../user/database';

export interface Database {
  'identity.user': UserTable;
}
