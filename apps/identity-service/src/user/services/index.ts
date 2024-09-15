import { Provider } from '@nestjs/common';
import { IValueHasher } from '../contracts';

import { ValueHasher } from './value-hasher';

export * from './value-hasher';

export const serviceProviders: Provider[] = [
  {
    provide: IValueHasher,
    useClass: ValueHasher,
  },
];
