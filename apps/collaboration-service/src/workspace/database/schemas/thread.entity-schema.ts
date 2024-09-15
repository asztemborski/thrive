import { EntitySchema } from '@mikro-orm/core';
import { Thread, Workspace } from '../../domain/entities';

export const ThreadEntitySchema = new EntitySchema<Thread>({
  class: Thread,
  properties: {
    id: { type: 'uuid', primary: true },
    name: { type: 'varchar' },
    workspaceId: {
      name: 'workspace_id',
      kind: 'm:1',
      entity: () => Workspace,
      mapToPk: true,
    },
  },
  schema: 'collaboration',
});
