import { Selectable } from 'kysely';

export interface UserTable {
  id: string;
  emailAddress: string;
  emailConfirmed: boolean;
  username: string;
  passwordHash: string;
}

export type UserSchema = Selectable<UserTable>;
