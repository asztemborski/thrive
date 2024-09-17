import { IInvitationRepository } from '../contracts/invitation-repository.contract';
import { Inject, Injectable, NotImplementedException } from '@nestjs/common';

// import { Database } from '../../common/database/schema';
// import { invitations } from './schemas';
import { eq } from 'drizzle-orm';
import { IInvitationMapper } from '../contracts/invitation-mapper.contract';
import { Invitation } from '../domain';

@Injectable()
export class InvitationRepository implements IInvitationRepository {
  constructor(@Inject(IInvitationMapper) private readonly invitationMapper: IInvitationMapper) {}

  async getById(id: string): Promise<Invitation | undefined> {
    throw new NotImplementedException();

    // const invitation = await this.db.query.invitations.findFirst({
    //   where: eq(invitations.id, id),
    // });

    // return invitation && this.invitationMapper.toDomain(invitation);
  }

  async save(invitation: Invitation): Promise<void> {
    throw new NotImplementedException();
    // const schema = this.invitationMapper.toPersistence(invitation);
    // await this.db.insert(invitations).values(schema);
  }
}
