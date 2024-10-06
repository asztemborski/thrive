import { ExceptionBase } from '@packages/nest-exceptions';
import { exceptionCodes } from './exception.codes';

export class InvitationNotFoundException extends ExceptionBase {
  constructor() {
    super(`Couldn't find invitation`, exceptionCodes.invitationNotFound);
  }
}
