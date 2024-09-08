import { Workspace } from '../domain/aggregate-roots';

export const IWorkspaceRepository = Symbol('__WORKSPACE_REPOSITORY__');

export interface IWorkspaceRepository {
  getById(workspaceId: string): Promise<Workspace | undefined>;
  getMemberWorkspaces(memberId: string): Promise<Workspace[]>;
  create(workspaceId: Workspace): Promise<void>;
  exists(workspaceId: string): Promise<boolean>;
  saveMember(workspace: Workspace, memberId: string): Promise<void>;
  memberExists(id: string, memberId: string): Promise<boolean>;
}
