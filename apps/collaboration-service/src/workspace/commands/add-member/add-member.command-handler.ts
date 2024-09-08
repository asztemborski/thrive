import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddMemberCommand } from './add-member.command';
import { Inject } from '@nestjs/common';
import { IWorkspaceRepository } from '../../contracts';
import { WorkspaceNotFoundException } from '../../exceptions';
import { IInvitationService } from '../../../invitation/contracts/invitation-service.contract';

@CommandHandler(AddMemberCommand)
export class AddMemberCommandHandler implements ICommandHandler<AddMemberCommand> {
  constructor(
    @Inject(IWorkspaceRepository)
    private readonly workspaceRepository: IWorkspaceRepository,
    @Inject(IInvitationService) private readonly invitationService: IInvitationService,
  ) {}

  async execute(command: AddMemberCommand): Promise<void> {
    const invitation = await this.invitationService.getById(command.invitationId);
    const workspace = await this.workspaceRepository.getById(invitation.organizationId);

    if (!workspace) {
      throw new WorkspaceNotFoundException();
    }

    workspace.addMember(command.userId, command.memberName);
    await this.workspaceRepository.saveMember(workspace, command.userId);
  }
}
