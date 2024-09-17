import { EntitySchema } from '@mikro-orm/core';
import { Thread, ThreadCategory, WorkspaceThreads } from '../../domain/entities';

export const WorkspaceThreadsEntitySchema = new EntitySchema<unknown>({
  class: WorkspaceThreads,
  properties: {
    _id: { name: 'id', type: 'uuid', primary: true },
    _categories: {
      kind: '1:m',
      entity: ThreadCategory.name,
      mappedBy: '_workspaceId',
    },
    _threads: {
      kind: '1:m',
      entity: Thread.name,
      mappedBy: '_workspaceId',
    },
    id: { type: 'method', getter: true, persist: false },
    categories: { type: 'method', getter: true, persist: false },
    threads: { type: 'method', getter: true, persist: false },
  },
  schema: 'collaboration',
});
