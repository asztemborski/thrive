import { ExceptionBase } from '@packages/nest-exceptions';
import {
  INVITATION_INVALID_EXPIRATION_DATE,
  INVITATION_NOT_FOUND,
  ORGANIZATION_MEMBER_NOT_EXISTS,
  ORGANIZATION_NOT_EXISTS,
} from './exception.codes';

export class OrganizationDoesNotExistException extends ExceptionBase {
  constructor() {
    super('Organization with provided id does not exists', ORGANIZATION_NOT_EXISTS);
  }
}

export class OrganizationMemberDoesNotExistException extends ExceptionBase {
  constructor() {
    super('Organization member does not exist', ORGANIZATION_MEMBER_NOT_EXISTS);
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
