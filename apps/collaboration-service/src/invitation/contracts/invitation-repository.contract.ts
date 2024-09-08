import { Invitation } from '../domain';

export const IInvitationRepository = Symbol('__ORGANIZATION_INVITATION_REPOSITORY__');

export interface IInvitationRepository {
  getById(id: string): Promise<Invitation | undefined>;
  save(invitation: Invitation): Promise<void>;
}
