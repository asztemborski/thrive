import { WorkspaceEntitySchema } from './workspace.entity-schema';
import { EntitySchema } from '@mikro-orm/core';
import { MemberEntitySchema } from './member.entity-schema';
import { WorkspaceDetailsVoSchema } from './workspace-details.vo-schema';

export const databaseSchemas: EntitySchema[] = [
  WorkspaceEntitySchema,
  MemberEntitySchema,
  WorkspaceDetailsVoSchema,
];
