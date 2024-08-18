import { PublicController } from '@packages/nest-api';

@PublicController({ version: '1', path: 'auth' })
export class PublicAuthController {}
