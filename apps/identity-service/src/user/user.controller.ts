import { PublicController } from '@packages/nest-api';

@PublicController({ version: '1', path: 'user' })
export class PublicUserController {}
