import { ICommand } from '@nestjs/cqrs';

export class CreateInvitationCommand implements ICommand {
  readonly organizationId: string;
  readonly expiresAt: Date | undefined;

  constructor(properties: CreateInvitationCommand) {
    Object.assign(this, properties);
  }
}
