import { MemberSchema, OrganizationSchema } from '../database';
import { Organization } from '../domain/aggregate-roots';

export const IOrganizationMapper = Symbol('__ORGANIZATION_ORGANIZATION_MAPPER__');

export type OrganizationToDomainSchema = OrganizationSchema & {
  members: MemberSchema[];
};

export interface IOrganizationMapper {
  toPersistence(entity: Organization): OrganizationSchema;
  toDomain(schema: OrganizationToDomainSchema): Organization;
}
