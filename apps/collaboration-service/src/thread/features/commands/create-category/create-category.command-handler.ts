import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from './create-category.command';
import { InjectRepository } from '@mikro-orm/nestjs';
import { WorkspaceThreads } from '../../../domain/entities';
import { WorkspaceThreadsNotFoundException } from '../../../exceptions';
import { WorkspaceThreadsRepository } from '../../../database/repositories';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryCommandHandler implements ICommandHandler<CreateCategoryCommand> {
  constructor(
    @InjectRepository(WorkspaceThreads)
    private readonly workspaceThreadsRepository: WorkspaceThreadsRepository,
  ) {}

  async execute(command: CreateCategoryCommand): Promise<any> {
    const workspaceThreads = await this.workspaceThreadsRepository.findOne(command.workspaceId);

    if (!workspaceThreads) {
      throw new WorkspaceThreadsNotFoundException(command.workspaceId);
    }

    await workspaceThreads.categories.init();
    workspaceThreads.addCategory(command.name, command.parentCategoryId);
    await this.workspaceThreadsRepository.getEntityManager().flush();
  }
}
