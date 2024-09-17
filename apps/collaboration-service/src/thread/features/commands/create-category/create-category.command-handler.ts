import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from './create-category.command';
import { InjectRepository } from '@mikro-orm/nestjs';
import { WorkspaceThreads } from '../../../domain/entities';
import { EntityRepository } from '@mikro-orm/core';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryCommandHandler implements ICommandHandler<CreateCategoryCommand> {
  constructor(
    @InjectRepository(WorkspaceThreads)
    private readonly workspaceThreadsRepository: EntityRepository<WorkspaceThreads>,
  ) {}

  async execute(command: CreateCategoryCommand): Promise<any> {
    const workspaceThreads = await this.workspaceThreadsRepository.findOne(command.workspaceId);

    if (!workspaceThreads) throw new Error('Workspace not found');

    await workspaceThreads.categories.init();
    workspaceThreads.addCategory(command.name, command.parentCategoryId);
    await this.workspaceThreadsRepository.getEntityManager().flush();
  }
}
