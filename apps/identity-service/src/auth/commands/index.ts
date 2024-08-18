import { AuthenticateCommandHandler } from './authenticate';
import { RefreshCommandHandler } from './refresh';
import { ValidateCommandHandler } from './validate';
import { LogoutCommandHandler } from './logout';
import { LogoutAllCommandHandler } from './logout-all/logout-all.command-handler';

export const commandHandlers = [
  AuthenticateCommandHandler,
  RefreshCommandHandler,
  ValidateCommandHandler,
  LogoutCommandHandler,
  LogoutAllCommandHandler,
];
