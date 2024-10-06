import { ICommand } from '@nestjs/cqrs';
import { UserPayload } from '@packages/nest-api';

export class AddMemberCommand implements ICommand {
  constructor(
    readonly user: UserPayload,
    readonly invitationId: string,
  ) {}
}
