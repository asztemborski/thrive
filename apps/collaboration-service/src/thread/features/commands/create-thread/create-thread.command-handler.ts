import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateThreadCommand } from './create-thread.command';
import { InjectRepository } from '@mikro-orm/nestjs';
import { WorkspaceThreads } from '../../../domain/entities';
import { EntityRepository } from '@mikro-orm/core';
import { WorkspaceThreadsNotFoundException } from '../../../exceptions';

@CommandHandler(CreateThreadCommand)
export class CreateThreadCommandHandler implements ICommandHandler<CreateThreadCommand> {
  constructor(
    @InjectRepository(WorkspaceThreads)
    private readonly workspaceThreadsRepository: EntityRepository<WorkspaceThreads>,
  ) {}

  async execute(command: CreateThreadCommand): Promise<string> {
    const workspaceThreads = await this.workspaceThreadsRepository.findOne(command.workspaceId);

    if (!workspaceThreads) {
      throw new WorkspaceThreadsNotFoundException(command.workspaceId);
    }

    await Promise.all([workspaceThreads.categories.init(), workspaceThreads.threads.init()]);
    const createdThreadId = workspaceThreads.addThread(command.name, command.categoryId);
    await this.workspaceThreadsRepository.getEntityManager().flush();
    return createdThreadId;
  }
}
