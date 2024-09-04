import { ICommand } from '@nestjs/cqrs';

export class AddMemberCommand implements ICommand {
  readonly invitationId: string;
  readonly userId: string;
  readonly memberName: string;

  constructor(properties: AddMemberCommand) {
    Object.assign(this, properties);
  }
}
