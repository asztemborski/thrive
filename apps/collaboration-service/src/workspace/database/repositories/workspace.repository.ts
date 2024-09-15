import { IWorkspaceRepository } from '../../contracts';
import { Workspace } from '../../domain/entities';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Member } from '../../domain/entities/member.entity';

export class WorkspaceRepository
  extends EntityRepository<Workspace>
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
