import { EntityBase } from "./entity.base";

export interface Mapper<TEntity extends EntityBase<unknown>, TSchema> {
  toPersistence(entity: TEntity): TSchema;
  toDomain(schema: TSchema): TEntity;
}
