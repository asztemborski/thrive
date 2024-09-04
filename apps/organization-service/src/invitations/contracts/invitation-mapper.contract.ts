import { Invitation } from '../domain';
import { InvitationSchema } from '../database/schemas/invitation.schema';

export const IInvitationMapper = Symbol('__ORGANIZATION_INVITATION_MAPPER__');

export interface IInvitationMapper {
  toPersistence(invitation: Invitation): InvitationSchema;
  toDomain(schema: InvitationSchema): Invitation;
}
