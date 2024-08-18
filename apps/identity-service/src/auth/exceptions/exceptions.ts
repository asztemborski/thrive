import { ExceptionBase } from '@packages/nest-exceptions';
import { UNAUTHORIZED } from './exception.codes';

export class UnauthorizedException extends ExceptionBase {
  constructor() {
    super('Unauthorized', UNAUTHORIZED);
  }
}
