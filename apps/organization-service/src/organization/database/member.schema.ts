import { Selectable } from 'kysely';

export interface MemberTable {
  id: string;
  userId: string;
  name: string;
  organizationId: string;
}

export type MemberSchema = Selectable<MemberTable>;
