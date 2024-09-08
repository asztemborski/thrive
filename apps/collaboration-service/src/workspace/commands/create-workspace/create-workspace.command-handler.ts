import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { CreateWorkspaceCommand } from './create-workspace.command';
import { WorkspaceName } from '../../domain/value-objects';
import { IWorkspaceRepository } from '../../contracts';
import { Workspace } from '../../domain/aggregate-roots';

@CommandHandler(CreateWorkspaceCommand)
export class CreateWorkspaceCommandHandler implements ICommandHandler<CreateWorkspaceCommand> {
  constructor(
    @Inject(IWorkspaceRepository)
    private readonly workspaceRepository: IWorkspaceRepository,
  ) {}

  async execute(command: CreateWorkspaceCommand): Promise<string> {
    const { username, id } = command.user;

    const workspace = Workspace.create({
      name: new WorkspaceName({ value: command.name }),
      description: command.description,
      members: [{ id, name: username }],
    });

    await this.workspaceRepository.create(workspace);
    return workspace.id;
  }
}
