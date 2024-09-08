import { EntityBase } from '@packages/nest-ddd';

import {
  MemberIsAlreadyOwnerException,
  WorkspaceRoleAlreadyAssignedException,
  WorkspaceRoleNotFoundException,
} from '../exceptions';
import { WorkspaceRole } from './workspace-role.entity';

type WorkspaceMemberProperties = {
  name: string;
  roles: WorkspaceRole[];
  isOwner: boolean;
};

type CreateWorkspaceMemberProperties = {
  id: string;
  name: string;
};

export class WorkspaceMember extends EntityBase<WorkspaceMemberProperties> {
  static create(properties: CreateWorkspaceMemberProperties): WorkspaceMember {
    return new WorkspaceMember({ ...properties, roles: [], isOwner: false });
  }

  setAsOwner(): void {
    if (this.isOwner) {
      throw new MemberIsAlreadyOwnerException();
    }

    this.properties.isOwner = true;
  }

  addRole(role: WorkspaceRole): void {
    const roleAssigned = !!this.roles.find((r) => r.id === role.id);

    if (roleAssigned) {
      throw new WorkspaceRoleAlreadyAssignedException();
    }

    this.properties.roles.push(role);
  }

  removeRole(role: WorkspaceRole): void {
    const roleIndex = this.properties.roles.findIndex((r) => r.id === role.id);

    if (roleIndex === -1) {
      throw new WorkspaceRoleNotFoundException();
    }

    this.properties.roles.splice(roleIndex, 1);
  }

  get name(): string {
    return this.properties.name;
  }

  get roles(): readonly WorkspaceRole[] {
    return this.properties.roles;
  }

  get isOwner(): boolean {
    return this.properties.isOwner;
  }
}
