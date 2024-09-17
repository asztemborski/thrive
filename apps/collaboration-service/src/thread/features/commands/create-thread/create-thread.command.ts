import { ICommand } from '@nestjs/cqrs';

export class CreateThreadCommand implements ICommand {
  readonly workspaceId: string;
  readonly name: string;
  readonly categoryId?: string;

  constructor(properties: CreateThreadCommand) {
    Object.assign(this, properties);
  }
}
