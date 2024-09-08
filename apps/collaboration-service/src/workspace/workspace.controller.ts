import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Body, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PrivateController, User, UserPayload } from '@packages/nest-api';

import { CreateWorkspaceRequestDto, GetWorkspaceResponseDto } from './dtos';

import { IsWorkspaceMemberGuard } from '../common/guards';
import { AddMemberCommand } from './commands/add-member/add-member.command';

import { GetWorkspaceQuery } from './queries/get-workspace';
import { CreateWorkspaceCommand } from './commands/create-workspace';
import { GetWorkspacesQuery } from './queries/get-workspaces';

@PrivateController({ version: '1', path: 'workspace' })
export class PrivateWorkspaceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getWorkspaces(@User() user: UserPayload): Promise<GetWorkspaceResponseDto[]> {
    const query = new GetWorkspacesQuery(user.id);
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
    const query = new GetWorkspaceQuery(workspaceId);
    return await this.queryBus.execute(query);
  }

  @Get('join/:invitationId')
  async joinWorkspace(
    @Param('invitationId') invitationId: string,
    @User() user: UserPayload,
  ): Promise<void> {
    const command = new AddMemberCommand({
      userId: user.id,
      memberName: user.username,
      invitationId,
    });
    await this.commandBus.execute(command);
  }
}
