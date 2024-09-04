import { IInvitationMapper } from '../contracts/invitation-mapper.contract';
import { Injectable } from '@nestjs/common';
import { Invitation } from '../domain';
import { InvitationSchema } from '../database/schemas/invitation.schema';

@Injectable()
export class InvitationMapper implements IInvitationMapper {
  toPersistence(invitation: Invitation): InvitationSchema {
    const properties = invitation.getProperties();

    return {
      ...properties,
      expiresAt: properties.expiresAt?.toISOString() ?? null,
      createdAt: properties.createdAt.toISOString(),
    };
  }

  toDomain(schema: InvitationSchema): Invitation {
    return new Invitation(schema);
  }
}
