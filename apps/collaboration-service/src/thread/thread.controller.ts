import { PrivateController } from '@packages/nest-api';
import { Body, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCategoryCommand } from './features/commands/create-category';
import { CreateCategoryRequestDto, CreateThreadRequestDto } from './dtos';
import { CreateThreadCommand } from './features/commands/create-thread';
import { WorkspaceThreadsQuery } from './features/queries';
import { EntityDTO } from '@mikro-orm/core';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@PrivateController({ version: '1', tag: 'workspace', path: 'workspace/:workspaceId' })
export class PrivateThreadController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('/threads')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401 })
  @ApiOperation({
    summary: 'Retrieves workspace threads.',
    description: `Retrieves all threads associated with the workspace`,
  })
  async getThreads(@Param('workspaceId') workspaceId: string): Promise<EntityDTO<unknown>> {
    const query = new WorkspaceThreadsQuery(workspaceId);
    return await this.queryBus.execute(query);
  }

  @Post('/category')
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 401 })
  @ApiOperation({ summary: 'Creates new category.', description: `Creates new thread category` })
  async createCategory(
    @Param('workspaceId') workspaceId: string,
    @Body() request: CreateCategoryRequestDto,
  ): Promise<void> {
    const command = new CreateCategoryCommand({ workspaceId, ...request });
    return await this.commandBus.execute(command);
  }

  @Post('/thread')
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 401 })
  @ApiOperation({ summary: 'Creates new thread.', description: `Creates new workspace thread` })
  async createThread(
    @Param('workspaceId') workspaceId: string,
    @Body() request: CreateThreadRequestDto,
  ): Promise<void> {
    const command = new CreateThreadCommand({ workspaceId, ...request });
    return await this.commandBus.execute(command);
  }
}
