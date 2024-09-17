import { PrivateController } from '@packages/nest-api';
import { Body, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCategoryCommand } from './features/commands/create-category';
import { CreateCategoryRequestDto, CreateThreadRequestDto } from './dtos';
import { CreateThreadCommand } from './features/commands/create-thread';
import { WorkspaceThreadsQuery } from './features/queries';
import { EntityDTO } from '@mikro-orm/core';

@PrivateController({ version: '1', path: 'workspace/:workspaceId' })
export class PrivateThreadController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('/threads')
  async getThreads(@Param('workspaceId') workspaceId: string): Promise<EntityDTO<unknown>> {
    const query = new WorkspaceThreadsQuery(workspaceId);
    return await this.queryBus.execute(query);
  }

  @Post('/category')
  async createCategory(
    @Param('workspaceId') workspaceId: string,
    @Body() request: CreateCategoryRequestDto,
  ): Promise<void> {
    const command = new CreateCategoryCommand({ workspaceId, ...request });
    await this.commandBus.execute(command);
  }

  @Post('/thread')
  async createThread(
    @Param('workspaceId') workspaceId: string,
    @Body() request: CreateThreadRequestDto,
  ): Promise<void> {
    const command = new CreateThreadCommand({ workspaceId, ...request });
    await this.commandBus.execute(command);
  }
}
