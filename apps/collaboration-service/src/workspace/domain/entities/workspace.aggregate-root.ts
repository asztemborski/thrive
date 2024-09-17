import { AggregateRoot } from '@packages/nest-ddd';
import { WorkspaceDetails } from '../value-objects';
import { Collection } from '@mikro-orm/core';
import { Member } from './member.entity';
import { WorkspaceMemberAlreadyExistsException } from '../exceptions';
import { Owner } from '../value-objects/owner.value-object';
import { WorkspaceCreatedDomainEvent } from '../events';

type CreateWorkspaceProperties = {
  name: string;
  description: string;
  owner: Owner;
};

export class Workspace extends AggregateRoot<string> {
  private _details: WorkspaceDetails;
  private _members: Collection<Member>;

  constructor({ name, description, owner }: CreateWorkspaceProperties) {
    super(crypto.randomUUID());
    this._details = new WorkspaceDetails({ name, description });
    this._members = new Collection<Member>(this);
    this.addMember(owner.id, owner.name);
    this.addEvent(new WorkspaceCreatedDomainEvent(this));
  }

  updateDetails(details: WorkspaceDetails) {
    this._details = details;
  }

  addMember(id: string, name: string): void {
    if (this.members.find((member) => member.id === id)) {
      throw new WorkspaceMemberAlreadyExistsException();
    }

    this.members.add(new Member({ id, name, workspaceId: this.id }));
  }

  get details(): WorkspaceDetails {
    return this._details;
  }

  get members(): Collection<Member> {
    return this._members;
  }

  private set members(value: Collection<Member>) {
    this._members = value;
  }
}
