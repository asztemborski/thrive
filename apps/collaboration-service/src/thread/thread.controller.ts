import { PrivateController } from '@packages/nest-api';
import { Body, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCategoryCommand } from './features/commands/create-category';
import { CreateCategoryRequestDto, CreateThreadRequestDto } from './dtos';
import { CreateThreadCommand } from './features/commands/create-thread';

@PrivateController({ version: '1', path: 'workspace/:workspaceId' })
export class PrivateThreadController {
  constructor(private readonly commandBus: CommandBus) {}

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
