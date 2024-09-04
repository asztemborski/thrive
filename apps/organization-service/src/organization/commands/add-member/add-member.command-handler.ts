import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddMemberCommand } from './add-member.command';
import { Inject } from '@nestjs/common';
import { IOrganizationRepository } from '../../contracts';

import { IInvitationService } from '../../../invitations/contracts/invitation-service.contract';
import { OrganizationNotFoundException } from '../../exceptions/exceptions';

@CommandHandler(AddMemberCommand)
export class AddMemberCommandHandler implements ICommandHandler<AddMemberCommand> {
  constructor(
    @Inject(IOrganizationRepository)
    private readonly organizationRepository: IOrganizationRepository,
    @Inject(IInvitationService) private readonly invitationService: IInvitationService,
  ) {}

  async execute(command: AddMemberCommand): Promise<void> {
    const invitation = await this.invitationService.getById(command.invitationId);
    const organization = await this.organizationRepository.getById(invitation.organizationId);

    if (!organization) {
      throw new OrganizationNotFoundException();
    }

    organization.addMember(command.userId, command.memberName);
    await this.organizationRepository.saveMember(organization, command.userId);
  }
}
