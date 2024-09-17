import { ICommand } from '@nestjs/cqrs';

export class CreateCategoryCommand implements ICommand {
  readonly workspaceId: string;
  readonly name: string;
  readonly parentCategoryId?: string;

  constructor(properties: CreateCategoryCommand) {
    Object.assign(this, properties);
  }
}
