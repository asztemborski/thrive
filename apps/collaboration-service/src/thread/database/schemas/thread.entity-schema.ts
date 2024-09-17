import { EntitySchema } from '@mikro-orm/core';
import { Thread, ThreadCategory, WorkspaceThreads } from '../../domain/entities';

export const ThreadEntitySchema = new EntitySchema<unknown>({
  class: Thread,
  properties: {
    _id: { name: 'id', type: 'uuid', primary: true },
    _name: { name: 'name', type: 'varchar' },
    _workspaceId: {
      kind: 'm:1',
      name: 'workspace_id',
      entity: WorkspaceThreads.name,
      mapToPk: true,
    },
    _categoryId: {
      kind: 'm:1',
      name: 'category_id',
      entity: ThreadCategory.name,
      mapToPk: true,
      nullable: true,
    },
    id: { type: 'method', getter: true, persist: false },
  },
  schema: 'collaboration',
});
