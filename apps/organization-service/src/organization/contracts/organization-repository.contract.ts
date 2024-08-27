import { Organization } from '../domain/entities';

export const IOrganizationRepository = Symbol('__ORGANIZATION_ORGANIZATION_REPOSITORY__');

export interface IOrganizationRepository {
  create(organization: Organization): Promise<void>;
}
