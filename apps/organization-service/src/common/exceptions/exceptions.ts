import { ExceptionBase } from '@packages/nest-exceptions';
import { FORBIDDEN } from './exception.codes';

export class ForbiddenException extends ExceptionBase {
  constructor() {
    super('Forbidden', FORBIDDEN);
  }
}
