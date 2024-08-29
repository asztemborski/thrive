import { ExceptionBase } from '@packages/nest-exceptions';
import { ORGANIZATION_NOT_FOUND } from './exception.codes';

export class OrganizationNotFoundException extends ExceptionBase {
  constructor() {
    super('Organization not found', ORGANIZATION_NOT_FOUND);
  }
}
