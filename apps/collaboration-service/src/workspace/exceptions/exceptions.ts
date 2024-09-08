import { ExceptionBase } from '@packages/nest-exceptions';
import { WORKSPACE_NOT_FOUND } from './exception.codes';

export class WorkspaceNotFoundException extends ExceptionBase {
  constructor() {
    super('Workspace not found', WORKSPACE_NOT_FOUND);
  }
}
