import {
  EntityRepository,
  FilterQuery,
  FindOneOptions,
  FindOptions,
  Loaded,
} from '@mikro-orm/core';

export class BaseEntityRepository<T extends object, U extends object> extends EntityRepository<T> {
  override findOne<
    Hint extends string = never,
    Fields extends string = '*',
    Excludes extends string = never,
  >(
    where: FilterQuery<T> | FilterQuery<U>,
    options?: FindOneOptions<T, Hint, Fields, Excludes> | FindOneOptions<U, Hint, Fields, Excludes>,
  ): Promise<Loaded<T, Hint, Fields, Excludes> | null> {
    return super.findOne(
      where as FilterQuery<T>,
      options as FindOneOptions<T, Hint, Fields, Excludes>,
    );
  }

  override find<
    Hint extends string = never,
    Fields extends string = '*',
    Excludes extends string = never,
  >(
    where: FilterQuery<T> | FilterQuery<U>,
    options?: FindOptions<T, Hint, Fields, Excludes> | FindOptions<U, Hint, Fields, Excludes>,
  ): Promise<Loaded<T, Hint, Fields, Excludes>[]> {
    return super.find(where as FilterQuery<T>, options as FindOptions<T, Hint, Fields, Excludes>);
  }

  override findAndCount<
    Hint extends string = never,
    Fields extends string = '*',
    Excludes extends string = never,
  >(
    where: FilterQuery<T> | FilterQuery<U>,
    options?: FindOptions<T, Hint, Fields, Excludes> | FindOptions<U, Hint, Fields, Excludes>,
  ): Promise<[Loaded<T, Hint, Fields, Excludes>[], number]> {
    return super.findAndCount(
      where as FilterQuery<T>,
      options as FindOptions<T, Hint, Fields, Excludes>,
    );
  }
}
