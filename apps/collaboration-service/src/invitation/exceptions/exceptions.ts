import { ExceptionBase } from '@packages/nest-exceptions';
import {
  INVITATION_INVALID_EXPIRATION_DATE,
  INVITATION_NOT_FOUND,
  WORKSPACE_MEMBER_NOT_EXISTS,
  WORKSPACE_NOT_EXISTS,
} from './exception.codes';

export class WorkspaceDoesNotExistException extends ExceptionBase {
  constructor() {
    super('Workspace with provided id does not exists', WORKSPACE_NOT_EXISTS);
  }
}

export class WorkspaceMemberDoesNotExistException extends ExceptionBase {
  constructor() {
    super('Workspace member does not exist', WORKSPACE_MEMBER_NOT_EXISTS);
  }
}

export class InvalidInvitationExpirationDateException extends ExceptionBase {
  constructor() {
    super(
      'Invitation expiration date must be greater than current date',
      INVITATION_INVALID_EXPIRATION_DATE,
    );
  }
}

export class InvitationNotFoundException extends ExceptionBase {
  constructor() {
    super('Invitation with provided id was not found', INVITATION_NOT_FOUND);
  }
}
