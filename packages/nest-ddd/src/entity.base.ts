export type EntityId = string;

export abstract class EntityBase<T = EntityId> {
  private _id: T;

  constructor(id: T) {
    this.id = id;
  }

  private set id(value: T) {
    this._id = value;
  }

  get id(): T {
    return this._id;
  }
}
