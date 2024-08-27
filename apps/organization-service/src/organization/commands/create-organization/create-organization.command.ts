import { ICommand } from '@nestjs/cqrs';
import { UserPayload } from '@packages/nest-api';

export class CreateOrganizationCommand implements ICommand {
  readonly name: string;
  readonly description: string;
  readonly user: UserPayload;

  constructor(properties: CreateOrganizationCommand) {
    Object.assign(this, properties);
  }
}
