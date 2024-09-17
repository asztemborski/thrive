import { Collection } from '@mikro-orm/core';

export type ReadonlyCollection<T extends object, O extends object = object> = Omit<
  Collection<T, O>,
  'add' | 'removeAll' | 'remove' | 'set' | 'removeWithoutPropagation'
>;
