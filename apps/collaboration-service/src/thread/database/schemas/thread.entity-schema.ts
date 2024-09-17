import { EntitySchema } from '@mikro-orm/core';
import { Thread, ThreadCategory, WorkspaceThreads } from '../../domain/entities';

export const ThreadEntitySchema = new EntitySchema<unknown>({
  class: Thread,
  properties: {
    _id: { name: 'id', type: 'uuid', primary: true, hidden: true },
    _name: { name: 'name', type: 'varchar', hidden: true },
    _workspaceId: {
      kind: 'm:1',
      name: 'workspace_id',
      entity: WorkspaceThreads.name,
      mapToPk: true,
      hidden: true,
    },
    _categoryId: {
      kind: 'm:1',
      name: 'category_id',
      entity: ThreadCategory.name,
      mapToPk: true,
      nullable: true,
      hidden: true,
    },
    id: { type: 'method', getter: true, persist: false },
    categoryId: { type: 'method', getter: true, persist: false },
    name: { type: 'method', getter: true, persist: false },
  },
  schema: 'collaboration',
});
