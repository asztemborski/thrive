import { Entity, Property } from '@mikro-orm/core';

@Entity({ schema: 'collaboration' })
export class Invitation {
  @Property({ type: 'uuid', primary: true })
  readonly id: string;

  @Property({ type: 'uuid' })
  readonly workspaceId: string;

  @Property({ type: 'datetime' })
  readonly createdAt: Date;

  @Property({ type: 'uuid' })
  readonly createdBy: string;

  constructor(properties: Omit<Invitation, 'id' | 'isExpired' | 'createdAt'>) {
    this.id = crypto.randomUUID();
    this.createdAt = new Date();
    Object.assign(this, properties);
  }

  @Property({ type: 'function', getter: true, persist: false })
  get isExpired(): boolean {
    return this.createdAt >= new Date();
  }
}
