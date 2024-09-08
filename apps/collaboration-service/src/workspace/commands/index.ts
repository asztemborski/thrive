import { AddMemberCommandHandler } from './add-member/add-member.command-handler';
import { CreateWorkspaceCommandHandler } from './create-workspace';

export const commandHandlers = [CreateWorkspaceCommandHandler, AddMemberCommandHandler];
