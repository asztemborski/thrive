import { Invitation } from '../database';

export const IInvitationService = Symbol('__COLLABORATION_INVITATION_SERVICE__');

export type CreateInvitationWorkspace = {
  workspaceId: string;
  createdBy: string;
  expiresAt?: Date;
};

export interface IInvitationService {
  create(properties: CreateInvitationWorkspace): Promise<string>;
  getById(id: string): Promise<Invitation>;
}
