import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Body, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PrivateController, User, UserPayload } from '@packages/nest-api';

import { CreateWorkspaceRequestDto, GetWorkspaceResponseDto } from './dtos';
import { CreateWorkspaceCommand } from './features/commands/create-workspace';
import { IsWorkspaceMemberGuard } from '../common/guards';
import { WorkspacesListQuery } from './features/queries/workspaces-list';
import { WorkspaceDetailsQuery } from './features/queries/workspace-details';
import { AddMemberCommand } from './features/commands/add-member';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@PrivateController({ version: '1', path: 'workspace' })
export class PrivateWorkspaceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401 })
  @ApiOperation({
    summary: 'Retrieves workspaces.',
    description: `Retrieves all workspaces that user belongs to`,
  })
  async getWorkspaces(@User() user: UserPayload): Promise<GetWorkspaceResponseDto[]> {
    const query = new WorkspacesListQuery(user.id);
    return this.queryBus.execute(query);
  }

  @Post()
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 401 })
  @ApiOperation({ summary: 'Creates workspace.', description: `Creates new workspace` })
  async createWorkspace(
    @Body() request: CreateWorkspaceRequestDto,
    @User() user: UserPayload,
  ): Promise<string> {
    const command = new CreateWorkspaceCommand({ ...request, user });
    return await this.commandBus.execute(command);
  }

  @Get(':workspaceId')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401 })
  @ApiOperation({ summary: 'Retrieve workspace.', description: `Retrieves workspace details` })
  @UseGuards(IsWorkspaceMemberGuard)
  async getWorkspace(@Param('workspaceId') workspaceId: string): Promise<GetWorkspaceResponseDto> {
    const query = new WorkspaceDetailsQuery(workspaceId);
    return await this.queryBus.execute(query);
  }

  @Post('member/:invitationId')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401 })
  @ApiOperation({
    summary: 'Adds workspace member.',
    description: `Adds new member to a workspace. Must pass valid invitation id associated with the workspace`,
  })
  async addMember(
    @User() user: UserPayload,
    @Param('invitationId') invitationId: string,
  ): Promise<void> {
    const command = new AddMemberCommand(user, invitationId);
    return await this.commandBus.execute(command);
  }
}
