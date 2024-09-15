import { AggregateRoot } from '@packages/nest-ddd';
import { WorkspaceDetails } from '../value-objects';
import { Thread } from './thread.entity';
import { Collection } from '@mikro-orm/core';
import { Member } from './member.entity';
import { WorkspaceMemberAlreadyExistsException } from '../exceptions';
import { Owner } from '../value-objects/owner.value-object';

type CreateWorkspaceProperties = {
  name: string;
  description: string;
  owner: Owner;
};

export class Workspace extends AggregateRoot<string> {
  private _details: WorkspaceDetails;
  private _threads: Collection<Thread>;
  private _members: Collection<Member>;

  constructor({ name, description, owner }: CreateWorkspaceProperties) {
    super(crypto.randomUUID());
    this._details = new WorkspaceDetails({ name, description });
    this._threads = new Collection<Thread>(this);
    this._members = new Collection<Member>(this);
    this.addMember(owner.id, owner.name);
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

  get threads(): Collection<Thread> {
    return this._threads;
  }

  get members(): Collection<Member> {
    return this._members;
  }

  private set threads(value: Collection<Thread>) {
    this._threads = value;
  }

  private set members(value: Collection<Member>) {
    this._members = value;
  }
}
