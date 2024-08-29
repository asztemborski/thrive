import { EntityBase } from '@packages/nest-ddd';
import { OrganizationRole } from './organization-role.entity';
import {
  MemberIsAlreadyOwnerException,
  OrganizationRoleAlreadyAssignedException,
  OrganizationRoleNotFoundException,
} from '../exceptions';

type OrganizationMemberProperties = {
  userId: string;
  name: string;
  roles: OrganizationRole[];
  isOwner: boolean;
};

type CreateOrganizationMemberProperties = {
  userId: string;
  name: string;
};

export class OrganizationMember extends EntityBase<OrganizationMemberProperties> {
  static create(properties: CreateOrganizationMemberProperties): OrganizationMember {
    return new OrganizationMember({ ...properties, roles: [], isOwner: false });
  }

  setAsOwner(): void {
    if (this.isOwner) {
      throw new MemberIsAlreadyOwnerException();
    }

    this.properties.isOwner = true;
  }

  addRole(role: OrganizationRole): void {
    const roleAssigned = !!this.roles.find((r) => r.id === role.id);

    if (roleAssigned) {
      throw new OrganizationRoleAlreadyAssignedException();
    }

    this.roles.push(role);
  }

  removeRole(role: OrganizationRole): void {
    const roleIndex = this.properties.roles.findIndex((r) => r.id === role.id);

    if (roleIndex === -1) {
      throw new OrganizationRoleNotFoundException();
    }

    this.properties.roles.splice(roleIndex, 1);
  }

  get name(): string {
    return this.properties.name;
  }

  get roles(): OrganizationRole[] {
    return this.properties.roles;
  }

  get isOwner(): boolean {
    return this.properties.isOwner;
  }
}
