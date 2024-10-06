import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Body, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PrivateController, User, UserPayload } from '@packages/nest-api';

import { CreateWorkspaceRequestDto, GetWorkspaceResponseDto } from './dtos';
import { CreateWorkspaceCommand } from './features/commands/create-workspace';
import { IsWorkspaceMemberGuard } from '../common/guards';
import { WorkspacesListQuery } from './features/queries/workspaces-list';
import { WorkspaceDetailsQuery } from './features/queries/workspace-details';
import { AddMemberCommand } from './features/commands/add-member';

@PrivateController({ version: '1', path: 'workspace' })
export class PrivateWorkspaceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getWorkspaces(@User() user: UserPayload): Promise<GetWorkspaceResponseDto[]> {
    const query = new WorkspacesListQuery(user.id);
    return this.queryBus.execute(query);
  }

  @Post()
  async createWorkspace(
    @Body() request: CreateWorkspaceRequestDto,
    @User() user: UserPayload,
  ): Promise<string> {
    const command = new CreateWorkspaceCommand({ ...request, user });
    return await this.commandBus.execute(command);
  }

  @Get(':workspaceId')
  @UseGuards(IsWorkspaceMemberGuard)
  async getWorkspace(@Param('workspaceId') workspaceId: string): Promise<GetWorkspaceResponseDto> {
    const query = new WorkspaceDetailsQuery(workspaceId);
    return await this.queryBus.execute(query);
  }

  @Post('member/:invitationId')
  async addMember(
    @User() user: UserPayload,
    @Param('invitationId') invitationId: string,
  ): Promise<void> {
    const command = new AddMemberCommand(user, invitationId);
    return await this.commandBus.execute(command);
  }
}
