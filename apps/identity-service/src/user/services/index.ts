import { Provider } from '@nestjs/common';
import { IUserMapper, IValueHasher } from '../contracts';
import { UserMapper } from './user-mapper';
import { ValueHasher } from './value-hasher';

export * from './value-hasher';
export * from './user-mapper';

export const serviceProviders: Provider[] = [
  {
    provide: IUserMapper,
    useClass: UserMapper,
  },
  {
    provide: IValueHasher,
    useClass: ValueHasher,
  },
];
