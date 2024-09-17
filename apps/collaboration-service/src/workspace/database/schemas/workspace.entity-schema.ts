import { EntitySchema } from '@mikro-orm/core';
import { Workspace } from '../../domain/entities';
import { Member } from '../../domain/entities/member.entity';

import { WorkspaceDetails } from '../../domain/value-objects';
import { WorkspaceRepository } from '../repositories';

type WorkspaceEntityProperties = Omit<Workspace, 'domainEvents'>;

export const WorkspaceEntitySchema = new EntitySchema<WorkspaceEntityProperties>({
  class: Workspace,
  properties: {
    id: { type: 'uuid', primary: true },
    details: {
      kind: 'embedded',
      entity: 'WorkspaceDetailsVoSchema',
      prefix: false,
      onCreate: (workspace) => new WorkspaceDetails(workspace.details.unpack()),
    },
    members: {
      kind: '1:m',
      entity: () => Member,
      mappedBy: (member) => member.workspaceId,
    },
  },
  schema: 'collaboration',
  repository: () => WorkspaceRepository,
});
