import { MemberSchema } from '../database';
import { WorkspaceMember } from '../domain/entities';

export const IMemberMapper = Symbol('__WORKSPACE_MEMBER_MAPPER__');

export interface IMemberMapper {
  toPersistence(entity: WorkspaceMember, workspaceId: string): MemberSchema;
  toDomain(schema: MemberSchema): WorkspaceMember;
}
