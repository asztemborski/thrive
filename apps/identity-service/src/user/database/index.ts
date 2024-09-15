import { Provider } from '@nestjs/common';
import { IUserRepository } from '../contracts';
import { UserRepository } from './user.repository';

export * from './user.repository';

export const repositoryProviders: Provider[] = [
  {
    provide: IUserRepository,
    useClass: UserRepository,
  },
];
