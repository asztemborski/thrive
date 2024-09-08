import { AggregateRoot } from '@packages/nest-ddd';
import { InvalidInvitationExpirationDateException } from '../exceptions/exceptions';
import crypto from 'node:crypto';

type InvitationProperties = {
  workspaceId: string;
  creatorId: string;
  expiresAt?: Date;
  createdAt: Date;
};

type CreateInvitationProperties = {
  workspaceId: string;
  creatorId: string;
};

export class Invitation extends AggregateRoot<InvitationProperties> {
  constructor(properties: CreateInvitationProperties) {
    const id = crypto.randomBytes(20).toString('hex');
    super({ ...properties, id, createdAt: new Date() });
  }

  setExpirationDate(date: Date): void {
    if (date.getTime() <= new Date().getTime()) {
      throw new InvalidInvitationExpirationDateException();
    }

    this.properties.expiresAt = date;
  }

  get organizationId(): string {
    return this.properties.workspaceId;
  }

  get creatorId(): string {
    return this.properties.creatorId;
  }

  get isExpired(): boolean {
    const { expiresAt } = this.properties;

    return expiresAt ? expiresAt <= new Date() : false;
  }

  get createdAt(): Date {
    return this.properties.createdAt;
  }
}
