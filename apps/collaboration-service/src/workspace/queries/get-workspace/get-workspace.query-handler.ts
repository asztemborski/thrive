import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetWorkspaceQuery } from './get-workspace.query';
import { Inject } from '@nestjs/common';
import { IWorkspaceRepository } from '../../contracts';
import { GetWorkspaceResponseDto } from '../../dtos';
import { WorkspaceNotFoundException } from '../../exceptions';
import { plainToClass } from 'class-transformer';

@QueryHandler(GetWorkspaceQuery)
export class GetWorkspaceQueryHandler implements IQueryHandler<GetWorkspaceQuery> {
  constructor(
    @Inject(IWorkspaceRepository)
    private readonly workspaceRepository: IWorkspaceRepository,
  ) {}

  async execute(query: GetWorkspaceQuery): Promise<GetWorkspaceResponseDto> {
    const workspace = await this.workspaceRepository.getById(query.workspaceId);

    if (!workspace) {
      throw new WorkspaceNotFoundException();
    }

    return plainToClass(
      GetWorkspaceResponseDto,
      {
        ...workspace.getProperties(),
        name: workspace.name,
      },
      { excludeExtraneousValues: true },
    );
  }
}
