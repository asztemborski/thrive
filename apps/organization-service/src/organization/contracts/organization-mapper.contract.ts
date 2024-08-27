import { Organization } from '../domain/entities';
import { MemberSchema, OrganizationSchema } from '../database';

export const IOrganizationMapper = Symbol('__ORGANIZATION_ORGANIZATION_MAPPER__');

export type OrganizationToDomainSchema = OrganizationSchema & {
  owner: MemberSchema;
  members: MemberSchema[];
};

export interface IOrganizationMapper {
  toPersistence(entity: Organization): OrganizationSchema;
  toDomain(schema: OrganizationToDomainSchema): Organization;
}
