import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateWorkspaceCommand } from './create-workspace.command';
import { IWorkspaceRepository } from '../../../contracts';
import { Workspace } from '../../../domain/entities';
import { Owner } from '../../../domain/value-objects/owner.value-object';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@CommandHandler(CreateWorkspaceCommand)
export class CreateWorkspaceCommandHandler implements ICommandHandler<CreateWorkspaceCommand> {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: IWorkspaceRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: CreateWorkspaceCommand): Promise<string> {
    const { username, id } = command.user;

    const workspace = new Workspace({
      name: command.name,
      description: command.description,
      owner: new Owner({ id, name: username }),
    });

    await this.workspaceRepository.getEntityManager().persistAndFlush(workspace);
    await workspace.publishEvents(this.eventEmitter);
    return workspace.id;
  }
}
