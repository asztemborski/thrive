import { AggregateRoot } from '@packages/nest-ddd';
import { OrganizationName } from '../value-objects';
import { OrganizationRole } from './organization-role.entity';
import { OrganizationMember } from './organization-member.entity';
import {
  CannotRemoveOrganizationOwnerException,
  OrganizationMemberAlreadyExistsException,
  OrganizationMemberNotFoundException,
  OrganizationRoleNotFoundException,
} from '../exceptions';

type OrganizationProperties = {
  name: OrganizationName;
  description: string;
  iconUrl: string | null;
  members: OrganizationMember[];
  roles: OrganizationRole[];
};

type CreateOrganizationProperties = {
  name: OrganizationName;
  description: string;
};

export class Organization extends AggregateRoot<OrganizationProperties> {
  static create(properties: CreateOrganizationProperties): Organization {
    return new Organization({
      ...properties,
      roles: [],
      members: [],
      iconUrl: null,
    });
  }

  addMember(member: OrganizationMember): void {
    if (this.hasMember(member.id)) {
      throw new OrganizationMemberAlreadyExistsException();
    }

    if (this.members.length === 0) {
      member.setAsOwner();
    }

    this.properties.members.push(member);
  }

  removeMember(memberId: string): void {
    const member = this.findMemberById(memberId);

    if (!member) {
      throw new OrganizationMemberNotFoundException();
    }

    if (member.isOwner) {
      throw new CannotRemoveOrganizationOwnerException();
    }

    const index = this.findMemberIndexById(memberId);
    if (index === -1) {
      throw new OrganizationMemberNotFoundException();
    }

    this.properties.members.splice(index, 1);
  }

  assignRoleToMember(memberId: string, role: OrganizationRole): void {
    const member = this.findMemberById(memberId);
    if (!member) {
      throw new OrganizationMemberNotFoundException();
    }

    if (!this.hasRole(role.id)) {
      throw new OrganizationRoleNotFoundException();
    }

    member.addRole(role);
  }

  removeRoleFromMember(memberId: string, role: OrganizationRole): void {
    const member = this.findMemberById(memberId);
    if (!member) {
      throw new OrganizationMemberNotFoundException();
    }

    if (!this.hasRole(role.id)) {
      throw new OrganizationRoleNotFoundException();
    }

    member.removeRole(role);
  }

  private findMemberById(memberId: string): OrganizationMember | undefined {
    return this.properties.members.find((member) => member.id === memberId);
  }

  private findMemberIndexById(memberId: string): number {
    return this.properties.members.findIndex((member) => member.id === memberId);
  }

  private hasMember(memberId: string): boolean {
    return this.findMemberById(memberId) !== undefined;
  }

  private hasRole(roleId: string): boolean {
    return this.properties.roles.some((role) => role.id === roleId);
  }

  get description(): string {
    return this.properties.description;
  }

  set description(value: string) {
    this.properties.description = value;
  }

  get name(): string {
    return this.properties.name.value;
  }

  get members(): readonly OrganizationMember[] {
    return this.properties.members;
  }
}
