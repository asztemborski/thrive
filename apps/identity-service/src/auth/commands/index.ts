import { AuthenticateCommandHandler } from './authenticate';
import { RefreshCommandHandler } from './refresh';

export const commandHandlers = [AuthenticateCommandHandler, RefreshCommandHandler];
