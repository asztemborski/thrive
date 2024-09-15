import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WorkspaceDetailsQuery } from './workspace-details.query';
import { GetWorkspaceResponseDto } from '../../../dtos';
import { WorkspaceNotFoundException } from '../../../exceptions';
import { plainToClass } from 'class-transformer';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { Workspace } from '../../../domain/entities';
import { InjectRepository } from '@mikro-orm/nestjs';

@QueryHandler(WorkspaceDetailsQuery)
export class WorkspaceDetailsQueryHandler implements IQueryHandler<WorkspaceDetailsQuery> {
  constructor(
    @InjectRepository(Workspace) private readonly workspaceRepository: EntityRepository<Workspace>,
  ) {}

  async execute(query: WorkspaceDetailsQuery): Promise<GetWorkspaceResponseDto> {
    const workspace = await this.workspaceRepository.findOne({
      id: query.workspaceId,
    });

    if (!workspace) {
      throw new WorkspaceNotFoundException();
    }

    return plainToClass(
      GetWorkspaceResponseDto,
      {
        id: workspace.id,
        name: workspace.details.name,
        description: workspace.details.description,
      },
      { excludeExtraneousValues: true },
    );
  }
}
