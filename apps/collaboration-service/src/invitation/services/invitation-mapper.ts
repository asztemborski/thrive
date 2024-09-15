import { IInvitationMapper } from '../contracts/invitation-mapper.contract';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { Invitation } from '../domain';
// import { InvitationSchema } from '../database/schemas';

@Injectable()
export class InvitationMapper implements IInvitationMapper {
  toPersistence(invitation: Invitation): any {
    // const properties = invitation.getProperties();

    throw new NotImplementedException();

    // return {
    //   ...properties,
    //   expiresAt: properties.expiresAt?.toISOString() ?? null,
    //   createdAt: properties.createdAt.toISOString(),
    // };
  }

  toDomain(schema: any): Invitation {
    throw new NotImplementedException();
    // return new Invitation(schema);
  }
}
