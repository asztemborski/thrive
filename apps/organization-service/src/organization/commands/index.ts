import { CreateOrganizationCommandHandler } from './create-organization';
import { AddMemberCommandHandler } from './add-member/add-member.command-handler';

export * from './create-organization';

export const commandHandlers = [CreateOrganizationCommandHandler, AddMemberCommandHandler];
