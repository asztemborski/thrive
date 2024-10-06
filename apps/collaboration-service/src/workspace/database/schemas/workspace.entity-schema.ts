import { Collection, EntitySchema } from '@mikro-orm/core';
import { Workspace } from '../../domain/entities';
import { Member } from '../../domain/entities/member.entity';

import { WorkspaceDetails } from '../../domain/value-objects';
import { WorkspaceRepository } from '../repositories';

export type WorkspacePrivateProperties = {
  _details: WorkspaceDetails;
  _members: Collection<Member>;
};

export const WorkspaceEntitySchema = new EntitySchema<unknown>({
  class: Workspace,
  properties: {
    _id: { name: 'id', type: 'uuid', primary: true },
    _details: {
      kind: 'embedded',
      entity: 'WorkspaceDetailsVoSchema',
      prefix: false,
      onCreate: (workspace: Workspace) => new WorkspaceDetails(workspace.details.unpack()),
    },
    _members: {
      kind: '1:m',
      entity: Member.name,
      mappedBy: '_workspaceId',
    },
    id: { type: 'method', getter: true, persist: false },
    details: { type: 'method', getter: true, persist: false },
    members: { type: 'method', getter: true, persist: false },
  },
  schema: 'collaboration',
  repository: () => WorkspaceRepository,
});
