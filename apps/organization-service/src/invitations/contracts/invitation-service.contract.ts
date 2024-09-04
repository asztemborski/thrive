import { Invitation } from '../domain';

export const IInvitationService = Symbol('__ORGANIZATION_INVITATION_SERVICE__');

export interface IInvitationService {
  getById(id: string): Promise<Invitation | never>;
  create(organizationId: string, userId: string, expiresAt?: Date): Promise<Invitation>;
}
