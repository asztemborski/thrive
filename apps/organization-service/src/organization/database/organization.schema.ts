import { Selectable } from 'kysely';

export interface OrganizationTable {
  id: string;
  name: string;
  description: string;
  iconUrl: string | null;
  ownerId: string;
}

export type OrganizationSchema = Selectable<OrganizationTable>;
