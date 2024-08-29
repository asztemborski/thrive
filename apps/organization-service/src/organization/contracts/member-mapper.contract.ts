import { OrganizationMember } from '../domain/entities';
import { MemberSchema } from '../database';

export const IMemberMapper = Symbol('__ORGANIZATION_MEMBER_MAPPER__');

export interface IMemberMapper {
  toPersistence(entity: OrganizationMember, organizationId: string): MemberSchema;
  toDomain(schema: MemberSchema): OrganizationMember;
}
