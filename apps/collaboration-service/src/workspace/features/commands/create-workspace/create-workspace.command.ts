import { ICommand } from '@nestjs/cqrs';
import { UserPayload } from '@packages/nest-api';

export class CreateWorkspaceCommand implements ICommand {
  readonly name: string;
  readonly description: string;
  readonly user: UserPayload;

  constructor(properties: CreateWorkspaceCommand) {
    Object.assign(this, properties);
  }
}
