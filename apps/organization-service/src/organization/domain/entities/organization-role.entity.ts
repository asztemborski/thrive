import { EntityBase } from '@packages/nest-ddd';

type OrganizationRoleProperties = {
  name: string;
  permissions: string[];
};

export class OrganizationRole extends EntityBase<OrganizationRoleProperties> {
  updatePermissions(newPermission: string[]): void {
    this.properties.permissions = newPermission;
  }

  get name(): string {
    return this.properties.name;
  }

  get permissions(): string[] {
    return this.properties.permissions;
  }
}
