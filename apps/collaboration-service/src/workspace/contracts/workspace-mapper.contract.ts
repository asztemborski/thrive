import { MemberSchema, WorkspaceSchema } from '../database';
import { Workspace } from '../domain/aggregate-roots/workspace.aggregate-root';

export const IWorkspaceMapper = Symbol('__WORKSPACE_MAPPER__');

export type WorkspaceToDomainSchema = WorkspaceSchema & {
  members: MemberSchema[];
};

export interface IWorkspaceMapper {
  toPersistence(entity: Workspace): WorkspaceSchema;
  toDomain(schema: WorkspaceToDomainSchema): Workspace;
}
