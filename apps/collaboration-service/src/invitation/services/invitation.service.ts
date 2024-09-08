import { Inject, Injectable } from '@nestjs/common';
import { IInvitationService } from '../contracts/invitation-service.contract';

import {
  InvitationNotFoundException,
  WorkspaceDoesNotExistException,
  WorkspaceMemberDoesNotExistException,
} from '../exceptions/exceptions';
import { IInvitationRepository } from '../contracts/invitation-repository.contract';
import { Invitation } from '../domain';
import { IWorkspaceRepository } from '../../workspace/contracts';

@Injectable()
export class InvitationService implements IInvitationService {
  constructor(
    @Inject(IWorkspaceRepository)
    private readonly workspaceRepository: IWorkspaceRepository,
    @Inject(IInvitationRepository) private readonly invitationRepository: IInvitationRepository,
  ) {}

  async getById(id: string): Promise<Invitation | never> {
    const invitation = await this.invitationRepository.getById(id);

    if (!invitation || invitation.isExpired) {
      throw new InvitationNotFoundException();
    }

    return invitation;
  }

  async create(workspaceId: string, memberId: string, expiresAt?: Date): Promise<Invitation> {
    const workspace = await this.workspaceRepository.getById(workspaceId);

    if (!workspace) {
      throw new WorkspaceDoesNotExistException();
    }

    const member = workspace.members.find((member) => member.id === memberId);

    if (!member) {
      throw new WorkspaceMemberDoesNotExistException();
    }

    const invitation = new Invitation({
      workspaceId: workspace.id,
      creatorId: member.id,
    });

    if (expiresAt) {
      invitation.setExpirationDate(expiresAt);
    }

    await this.invitationRepository.save(invitation);
    return invitation;
  }
}
