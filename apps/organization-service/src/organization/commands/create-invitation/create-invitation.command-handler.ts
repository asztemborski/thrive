import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateInvitationCommand } from './create-invitation.command';

@CommandHandler(CreateInvitationCommand)
export class CreateInvitationCommandHandler implements ICommandHandler<CreateInvitationCommand> {
  execute(command: CreateInvitationCommand): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
