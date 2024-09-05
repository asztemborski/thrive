import { Organization } from '../domain/aggregate-roots';

export const IOrganizationRepository = Symbol('__ORGANIZATION_ORGANIZATION_REPOSITORY__');

export interface IOrganizationRepository {
  getById(organizationId: string): Promise<Organization | undefined>;
  getMemberOrganizations(memberId: string): Promise<Organization[]>;
  create(organization: Organization): Promise<void>;
  exists(organizationId: string): Promise<boolean>;
  saveMember(organization: Organization, memberId: string): Promise<void>;
  memberExists(id: string, memberId: string): Promise<boolean>;
}
