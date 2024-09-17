import { EntitySchema } from '@mikro-orm/core';
import { ThreadCategory, WorkspaceThreads } from '../../domain/entities';

export const ThreadCategoryEntitySchema = new EntitySchema<unknown>({
  class: ThreadCategory,
  properties: {
    _id: { name: 'id', type: 'uuid', primary: true },
    _name: { name: 'name', type: 'varchar' },
    _workspaceId: {
      kind: 'm:1',
      name: 'workspace_id',
      entity: WorkspaceThreads.name,
      mapToPk: true,
    },
    _parentCategoryId: {
      kind: 'm:1',
      name: 'parent_category_id',
      entity: ThreadCategory.name,
      mapToPk: true,
      nullable: true,
    },
    _subCategories: {
      kind: '1:m',
      entity: ThreadCategory.name,
      mappedBy: '_parentCategoryId',
    },
    id: { type: 'method', getter: true, persist: false },
    name: { type: 'method', getter: true, persist: false },
  },
  schema: 'collaboration',
});
