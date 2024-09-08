import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Inject } from '@nestjs/common';
import { IWorkspaceRepository } from '../../contracts';
import { GetWorkspacesQuery } from './get-workspaces.query';
import { plainToClass } from 'class-transformer';
import { GetWorkspaceResponseDto } from '../../dtos';

@QueryHandler(GetWorkspacesQuery)
export class GetWorkspacesQueryHandler implements IQueryHandler<GetWorkspacesQuery> {
  constructor(
    @Inject(IWorkspaceRepository)
    private readonly workspaceRepository: IWorkspaceRepository,
  ) {}

  async execute(query: GetWorkspacesQuery): Promise<GetWorkspaceResponseDto[]> {
    const workspaces = await this.workspaceRepository.getMemberWorkspaces(query.userId);

    return workspaces.map((workspace) => {
      const properties = workspace.getProperties();
      return plainToClass(
        GetWorkspaceResponseDto,
        { ...properties, name: workspace.name },
        { excludeExtraneousValues: true },
      );
    });
  }
}
