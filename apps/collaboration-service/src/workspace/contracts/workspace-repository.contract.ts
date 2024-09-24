import { Workspace } from '../domain/entities';
import { EntityRepository } from '@mikro-orm/core';

export interface IWorkspaceRepository extends EntityRepository<Workspace> {
  exists(workspaceId: string): Promise<boolean>;
  memberExists(id: string, memberId: string): Promise<boolean>;
}
