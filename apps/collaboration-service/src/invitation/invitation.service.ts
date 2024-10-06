import { CreateInvitationWorkspace, IInvitationService } from './contracts';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { Invitation } from './database';
import { InvitationNotFoundException } from './exceptions';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class InvitationService implements IInvitationService {
  constructor(
    @InjectRepository(Invitation)
    private readonly invitationRepository: EntityRepository<Invitation>,
  ) {}

  async create(properties: CreateInvitationWorkspace): Promise<string> {
    const invitation = new Invitation(properties);
    await this.invitationRepository.getEntityManager().persistAndFlush(invitation);
    return invitation.id;
  }

  async getById(id: string): Promise<Invitation> {
    const invitation = await this.invitationRepository.findOne(id);

    if (!invitation || invitation.isExpired) {
      throw new InvitationNotFoundException();
    }

    return invitation;
  }
}
