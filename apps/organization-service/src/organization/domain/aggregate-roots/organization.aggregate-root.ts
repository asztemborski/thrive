import { AggregateRoot } from '@packages/nest-ddd';
import { OrganizationName } from '../value-objects';
import { OrganizationMember, OrganizationRole } from '../entities';
import {
  CannotRemoveOrganizationOwnerException,
  OrganizationAtLeastOneMemberException,
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
  members: { id: string; name: string }[];
};

export class Organization extends AggregateRoot<OrganizationProperties> {
  static create({ members, ...properties }: CreateOrganizationProperties): Organization {
    if (members.length <= 0) {
      throw new OrganizationAtLeastOneMemberException();
    }

    const organization = new Organization({
      ...properties,
      roles: [],
      members: [],
      iconUrl: null,
    });

    members.forEach(({ id, name }) => organization.addMember(id, name));
    return organization;
  }

  addMember(id: string, name: string): void {
    if (this.members.find((member) => member.id === id)) {
      throw new OrganizationMemberAlreadyExistsException();
    }

    const member = OrganizationMember.create({
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
      throw new OrganizationMemberNotFoundException();
    }

    if (member.isOwner) {
      throw new CannotRemoveOrganizationOwnerException();
    }

    this.properties.members = this.properties.members.filter((m) => m.id !== memberId);
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

  private hasRole(roleId: string): boolean {
    return this.properties.roles.some((role) => role.id === roleId);
  }

  get description(): string {
    return this.properties.description;
  }

  get name(): string {
    return this.properties.name.value;
  }

  get members(): readonly OrganizationMember[] {
    return this.properties.members;
  }
}
