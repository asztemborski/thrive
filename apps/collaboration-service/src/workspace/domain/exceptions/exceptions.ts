import { ExceptionBase } from '@packages/nest-exceptions';
import {
  WORKSPACE_AT_LEAST_ONE_MEMBER,
  WORKSPACE_CANNOT_REMOVE_OWNER,
  WORKSPACE_MEMBER_ALREADY_EXISTS,
  WORKSPACE_MEMBER_IS_ALREADY_OWNER,
  WORKSPACE_MEMBER_NOT_FOUND,
  WORKSPACE_NAME_MAX_LENGTH,
  WORKSPACE_ROLE_ALREADY_ASSIGNED,
  WORKSPACE_ROLE_NOT_FOUND,
} from './exception.codes';

export class WorkspaceMaxLengthException extends ExceptionBase {
  constructor(minLength: number) {
    super(`Workspace name must not exceed ${minLength} characters.`, WORKSPACE_NAME_MAX_LENGTH);
  }
}

export class WorkspaceAtLeastOneMemberException extends ExceptionBase {
  constructor() {
    super('Workspace must have at least one member', WORKSPACE_AT_LEAST_ONE_MEMBER);
  }
}

export class WorkspaceMemberNotFoundException extends ExceptionBase {
  constructor() {
    super("Couldn't find member in the workspace", WORKSPACE_MEMBER_NOT_FOUND);
  }
}

export class WorkspaceMemberAlreadyExistsException extends ExceptionBase {
  constructor() {
    super('Member already exists in the workspace', WORKSPACE_MEMBER_ALREADY_EXISTS);
  }
}

export class WorkspaceRoleAlreadyAssignedException extends ExceptionBase {
  constructor() {
    super('This role is already assigned', WORKSPACE_ROLE_ALREADY_ASSIGNED);
  }
}

export class WorkspaceRoleNotFoundException extends ExceptionBase {
  constructor() {
    super('Workspace role not found', WORKSPACE_ROLE_NOT_FOUND);
  }
}

export class CannotRemoveWorkspaceOwnerException extends ExceptionBase {
  constructor() {
    super(`Owner can't be removed from his own organization`, WORKSPACE_CANNOT_REMOVE_OWNER);
  }
}

export class MemberIsAlreadyOwnerException extends ExceptionBase {
  constructor() {
    super('Member is already an owner', WORKSPACE_MEMBER_IS_ALREADY_OWNER);
  }
}
