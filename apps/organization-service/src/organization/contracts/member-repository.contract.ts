import { OrganizationMember } from '../domain/entities';

export const IMemberRepository = Symbol('__ORGANIZATION_MEMBER_REPOSITORY__');

export interface IMemberRepository {
  create(member: OrganizationMember, organizationId: string): Promise<void>;
}
