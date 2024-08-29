import { ExceptionBase } from '@packages/nest-exceptions';
import { ORGANIZATION_NOT_EXISTS } from './exception.codes';

export class OrganizationDoesNotExistException extends ExceptionBase {
  constructor() {
    super('Organization with provided id does not exists', ORGANIZATION_NOT_EXISTS);
  }
}
