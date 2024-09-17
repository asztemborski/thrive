import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WorkspaceThreads } from '../../../domain/entities';
import { WorkspaceThreadsQuery } from './workspace-threads.query';
import { InjectRepository } from '@mikro-orm/nestjs';
import { WorkspaceThreadsNotFoundException } from '../../../exceptions';
import { WorkspaceThreadsRepository } from '../../../database/repositories';
import { EntityDTO, wrap } from '@mikro-orm/core';

@QueryHandler(WorkspaceThreadsQuery)
export class WorkspaceThreadsQueryHandler implements IQueryHandler<WorkspaceThreadsQuery> {
  constructor(
    @InjectRepository(WorkspaceThreads)
    private readonly workspaceThreadsRepository: WorkspaceThreadsRepository,
  ) {}

  async execute(query: WorkspaceThreadsQuery): Promise<EntityDTO<unknown>> {
    const workspaceThreads = await this.workspaceThreadsRepository.findOne(
      {
        id: query.workspaceId,
      },
      { populate: ['_categories', '_threads'] },
    );

    if (!workspaceThreads) {
      throw new WorkspaceThreadsNotFoundException(query.workspaceId);
    }

    return wrap(workspaceThreads).serialize({
      populate: ['categories', 'threads'],
      forceObject: true,
      skipNull: true,
      exclude: ['id'],
    });
  }
}
