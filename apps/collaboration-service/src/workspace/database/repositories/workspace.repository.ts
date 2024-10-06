import { IWorkspaceRepository } from '../../contracts';
import { Workspace } from '../../domain/entities';
import { EntityRepository } from '@mikro-orm/core';
import { Member } from '../../domain/entities/member.entity';
import { BaseEntityRepository } from '@packages/database-utilities';
import { WorkspacePrivateProperties } from '../schemas/workspace.entity-schema';

export class WorkspaceRepository
  extends BaseEntityRepository<Workspace, WorkspacePrivateProperties>
  implements IWorkspaceRepository
{
  async exists(workspaceId: string): Promise<boolean> {
    return !!(await this.findOne({ id: workspaceId }, { fields: [] }));
  }

  async memberExists(id: string, memberId: string): Promise<boolean> {
    return !!(await this.getEntityManager().findOne(
      Member,
      { id: memberId, workspaceId: id },
      { fields: [] },
    ));
  }
}
