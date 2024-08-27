import {
  MemberTable,
  OrganizationTable,
  PermissionTable,
  RolePermissionTable,
  RoleTable,
} from '../organization/database';

export interface Database {
  'organization.organization': OrganizationTable;
  'organization.member': MemberTable;
  'organization.role': RoleTable;
  'organization.permission': PermissionTable;
  'organization.role_permission': RolePermissionTable;
}
