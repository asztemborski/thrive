import { AggregateRoot } from '@packages/nest-ddd';
import { WorkspaceName } from '../value-objects';

import {
  CannotRemoveWorkspaceOwnerException,
  WorkspaceAtLeastOneMemberException,
  WorkspaceMemberAlreadyExistsException,
  WorkspaceMemberNotFoundException,
  WorkspaceRoleNotFoundException,
} from '../exceptions';
import { WorkspaceMember, WorkspaceRole } from '../entities';

type WorkspaceProperties = {
  name: WorkspaceName;
  description: string;
  iconUrl: string | null;
  members: WorkspaceMember[];
  roles: WorkspaceRole[];
};

type CreateWorkspaceProperties = {
  name: WorkspaceName;
  description: string;
  members: { id: string; name: string }[];
};

export class Workspace extends AggregateRoot<WorkspaceProperties> {
  static create({ members, ...properties }: CreateWorkspaceProperties): Workspace {
    if (members.length <= 0) {
      throw new WorkspaceAtLeastOneMemberException();
    }

    const workspace = new Workspace({
      ...properties,
      roles: [],
      members: [],
      iconUrl: null,
    });

    members.forEach(({ id, name }) => workspace.addMember(id, name));
    return workspace;
  }

  addMember(id: string, name: string): void {
    if (this.members.find((member) => member.id === id)) {
      throw new WorkspaceMemberAlreadyExistsException();
    }

    const member = WorkspaceMember.create({
      id,
      name,
    });

    if (!this.members.length) {
      member.setAsOwner();
    }

    this.properties.members.push(member);
  }

  removeMember(memberId: string): void {
    const member = this.findMemberById(memberId);

    if (!member) {
      throw new WorkspaceMemberNotFoundException();
    }

    if (member.isOwner) {
      throw new CannotRemoveWorkspaceOwnerException();
    }

    this.properties.members = this.properties.members.filter((m) => m.id !== memberId);
  }

  assignRoleToMember(memberId: string, role: WorkspaceRole): void {
    const member = this.findMemberById(memberId);
    if (!member) {
      throw new WorkspaceMemberNotFoundException();
    }

    if (!this.hasRole(role.id)) {
      throw new WorkspaceRoleNotFoundException();
    }

    member.addRole(role);
  }

  removeRoleFromMember(memberId: string, role: WorkspaceRole): void {
    const member = this.findMemberById(memberId);
    if (!member) {
      throw new WorkspaceMemberNotFoundException();
    }

    if (!this.hasRole(role.id)) {
      throw new WorkspaceRoleNotFoundException();
    }

    member.removeRole(role);
  }

  private findMemberById(memberId: string): WorkspaceMember | undefined {
    return this.properties.members.find((member) => member.id === memberId);
  }

  private hasRole(roleId: string): boolean {
    return this.properties.roles.some((role) => role.id === roleId);
  }

  get description(): string {
    return this.properties.description;
  }

  get name(): string {
    return this.properties.name.value;
  }

  get members(): readonly WorkspaceMember[] {
    return this.properties.members;
  }
}
