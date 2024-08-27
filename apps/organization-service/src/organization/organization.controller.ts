import { PrivateController } from '@packages/nest-api';

@PrivateController({ version: '1', path: 'organization' })
export class PrivateOrganizationController {}
