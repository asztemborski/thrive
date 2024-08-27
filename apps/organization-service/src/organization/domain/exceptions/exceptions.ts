import { ExceptionBase } from '@packages/nest-exceptions';
import {
  ORGANIZATION_CANNOT_REMOVE_OWNER,
  ORGANIZATION_MEMBER_ALREADY_EXISTS,
  ORGANIZATION_MEMBER_NOT_FOUND,
  ORGANIZATION_NAME_MAX_LENGTH,
  ORGANIZATION_ROLE_ALREADY_ASSIGNED,
  ORGANIZATION_ROLE_NOT_FOUND,
} from './exception.codes';

export class OrganizationMaxLengthException extends ExceptionBase {
  constructor(minLength: number) {
    super(
      `Organization name must not exceed ${minLength} characters.`,
      ORGANIZATION_NAME_MAX_LENGTH,
    );
  }
}

export class OrganizationMemberNotFoundException extends ExceptionBase {
  constructor() {
    super("Couldn't find member in the organization", ORGANIZATION_MEMBER_NOT_FOUND);
  }
}

export class OrganizationMemberAlreadyExistsException extends ExceptionBase {
  constructor() {
    super('Member already exists in the organization', ORGANIZATION_MEMBER_ALREADY_EXISTS);
  }
}

export class OrganizationRoleAlreadyAssignedException extends ExceptionBase {
  constructor() {
    super('This role is already assigned', ORGANIZATION_ROLE_ALREADY_ASSIGNED);
  }
}

export class OrganizationRoleNotFoundException extends ExceptionBase {
  constructor() {
    super('Organization role not found', ORGANIZATION_ROLE_NOT_FOUND);
  }
}

export class CannotRemoveOrganizationOwnerException extends ExceptionBase {
  constructor() {
    super(`Owner can't be removed from his own organization`, ORGANIZATION_CANNOT_REMOVE_OWNER);
  }
}
