import { EntityBase } from '@packages/nest-ddd';

type WorkspaceRoleProperties = {
  name: string;
  permissions: string[];
};

export class WorkspaceRole extends EntityBase<WorkspaceRoleProperties> {
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
