import { Invitation } from '../domain';
// import { InvitationSchema } from '../database/schemas';

export const IInvitationMapper = Symbol('__ORGANIZATION_INVITATION_MAPPER__');

export interface IInvitationMapper {
  toPersistence(invitation: Invitation): any;
  toDomain(schema: any): Invitation;
}
