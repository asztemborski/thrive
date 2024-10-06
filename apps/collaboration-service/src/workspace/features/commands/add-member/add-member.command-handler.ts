import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddMemberCommand } from './add-member.command';
import { Inject } from '@nestjs/common';
import { IInvitationService } from '../../../../invitation/contracts';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Workspace } from '../../../domain/entities';
import { WorkspaceRepository } from '../../../database/repositories';
import { WorkspaceNotFoundException } from '../../../exceptions';

@CommandHandler(AddMemberCommand)
export class AddMemberCommandHandler implements ICommandHandler<AddMemberCommand> {
  constructor(
    @Inject(IInvitationService) private readonly invitationService: IInvitationService,
    @InjectRepository(Workspace) private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  async execute(command: AddMemberCommand): Promise<any> {
    const invitation = await this.invitationService.getById(command.invitationId);
    const workspace = await this.workspaceRepository.findOne(invitation.workspaceId, {
      populate: ['_members'],
    });

    if (!workspace) {
      throw new WorkspaceNotFoundException();
    }

    workspace.addMember(command.user.id, command.user.username);
    await this.workspaceRepository.getEntityManager().flush();
  }
}
