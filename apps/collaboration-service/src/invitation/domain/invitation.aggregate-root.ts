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

export class Invitation extends AggregateRoot {
  readonly _creatorId: string;
  readonly _createdAt: Date;

  // constructor(properties: CreateInvitationProperties) {
  //   const id = crypto.randomBytes(20).toString('hex');
  //   super({ ...properties, id, createdAt: new Date() });
  // }

  // setExpirationDate(date: Date): void {
  //   if (date.getTime() <= new Date().getTime()) {
  //     throw new InvalidInvitationExpirationDateException();
  //   }
  //
  //   this.props.expiresAt = date;
  // }
  //
  // get organizationId(): string {
  //   return this.props.workspaceId;
  // }

  get creatorId(): string {
    return this._creatorId;
  }

  get isExpired(): boolean {
    // const { expiresAt } = this.props;

    return false;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
