import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateThreadCommand } from './create-thread.command';
import { InjectRepository } from '@mikro-orm/nestjs';
import { WorkspaceThreads } from '../../../domain/entities';
import { EntityRepository } from '@mikro-orm/core';

@CommandHandler(CreateThreadCommand)
export class CreateThreadCommandHandler implements ICommandHandler<CreateThreadCommand> {
  constructor(
    @InjectRepository(WorkspaceThreads)
    private readonly workspaceThreadsRepository: EntityRepository<WorkspaceThreads>,
  ) {}

  async execute(command: CreateThreadCommand): Promise<void> {
    const workspaceThreads = await this.workspaceThreadsRepository.findOne(command.workspaceId);

    if (!workspaceThreads) throw new Error('Workspace threads not found');

    await workspaceThreads.categories.init();
    await workspaceThreads.threads.init();
    workspaceThreads.addThread(command.name, command.categoryId);
    await this.workspaceThreadsRepository.getEntityManager().flush();
  }
}
