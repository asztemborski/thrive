import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WorkspacesListQuery } from './workspaces-list.query';
import { plainToClass } from 'class-transformer';
import { GetWorkspaceResponseDto } from '../../../dtos';
import { Workspace } from '../../../domain/entities';
import { InjectRepository } from '@mikro-orm/nestjs';
import { IWorkspaceRepository } from '../../../contracts';

@QueryHandler(WorkspacesListQuery)
export class WorkspacesListQueryHandler implements IQueryHandler<WorkspacesListQuery> {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: IWorkspaceRepository,
  ) {}

  async execute(query: WorkspacesListQuery): Promise<GetWorkspaceResponseDto[]> {
    const workspaces = await this.workspaceRepository.find({
      _members: { id: query.userId },
    });

    return workspaces.map((workspace) =>
      plainToClass(
        GetWorkspaceResponseDto,
        {
          id: workspace.id,
          name: workspace.details.name,
          description: workspace.details.description,
        },
        { excludeExtraneousValues: true },
      ),
    );
  }
}
