import { ExceptionBase } from '@packages/nest-exceptions';
import { exceptionCodes } from './exception.codes';

export class WorkspaceThreadsNotFoundException extends ExceptionBase {
  constructor(id: string) {
    super(`Workspace threads with id: ${id} not found`, exceptionCodes.workspaceThreadsNotFound);
  }
}
