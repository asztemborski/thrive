import { Inject, Injectable } from '@nestjs/common';
import { IInvitationService } from '../contracts/invitation-service.contract';
import { IOrganizationRepository } from '../../organization/contracts';
import {
  InvitationNotFoundException,
  OrganizationDoesNotExistException,
  OrganizationMemberDoesNotExistException,
} from '../exceptions/exceptions';
import { IInvitationRepository } from '../contracts/invitation-repository.contract';
import { Invitation } from '../domain';

@Injectable()
export class InvitationService implements IInvitationService {
  constructor(
    @Inject(IOrganizationRepository)
    private readonly organizationRepository: IOrganizationRepository,
    @Inject(IInvitationRepository) private readonly invitationRepository: IInvitationRepository,
  ) {}

  async getById(id: string): Promise<Invitation | never> {
    const invitation = await this.invitationRepository.getById(id);

    if (!invitation || invitation.isExpired) {
      throw new InvitationNotFoundException();
    }

    return invitation;
  }

  async create(organizationId: string, memberId: string, expiresAt?: Date): Promise<Invitation> {
    const organization = await this.organizationRepository.getById(organizationId);

    if (!organization) {
      throw new OrganizationDoesNotExistException();
    }

    const member = organization.members.find((member) => member.id === memberId);

    if (!member) {
      throw new OrganizationMemberDoesNotExistException();
    }

    const invitation = new Invitation({
      organizationId: organization.id,
      creatorId: member.id,
    });

    if (expiresAt) {
      invitation.setExpirationDate(expiresAt);
    }

    await this.invitationRepository.save(invitation);
    return invitation;
  }
}
