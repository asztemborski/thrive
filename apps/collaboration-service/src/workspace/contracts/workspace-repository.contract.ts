import { BaseEntityRepository } from '@packages/database-utilities';
import { Workspace } from '../domain/entities';
import { WorkspacePrivateProperties } from '../database/schemas/workspace.entity-schema';

export interface IWorkspaceRepository
  extends BaseEntityRepository<Workspace, WorkspacePrivateProperties> {
  exists(workspaceId: string): Promise<boolean>;
  memberExists(id: string, memberId: string): Promise<boolean>;
}
