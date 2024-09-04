import { IInvitationRepository } from '../contracts/invitation-repository.contract';
import { Inject, Injectable } from '@nestjs/common';
import { InjectDrizzle } from '@packages/nest-drizzle';
import { Database } from '../../database/schema';
import { invitations } from './schemas/invitation.schema';
import { eq } from 'drizzle-orm';
import { IInvitationMapper } from '../contracts/invitation-mapper.contract';
import { Invitation } from '../domain';

@Injectable()
export class InvitationRepository implements IInvitationRepository {
  constructor(
    @InjectDrizzle() private readonly db: Database,
    @Inject(IInvitationMapper) private readonly invitationMapper: IInvitationMapper,
  ) {}

  async getById(id: string): Promise<Invitation | undefined> {
    const invitation = await this.db.query.invitations.findFirst({
      where: eq(invitations.id, id),
    });

    return invitation && this.invitationMapper.toDomain(invitation);
  }

  async save(invitation: Invitation): Promise<void> {
    const schema = this.invitationMapper.toPersistence(invitation);
    await this.db.insert(invitations).values(schema);
  }
}
