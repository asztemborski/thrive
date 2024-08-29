import { Organization } from '../domain/entities';

export const IOrganizationRepository = Symbol('__ORGANIZATION_ORGANIZATION_REPOSITORY__');

export interface IOrganizationRepository {
  getById(organizationId: string): Promise<Organization | undefined>;
  create(organization: Organization): Promise<void>;
  exists(organizationId: string): Promise<boolean>;
}
