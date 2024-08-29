export const IInvitationService = Symbol('__ORGANIZATION_INVITATION_SERVICE__');

export interface IInvitationService {
  create(organizationId: string, expiresAt: Date | undefined): Promise<string>;
}
