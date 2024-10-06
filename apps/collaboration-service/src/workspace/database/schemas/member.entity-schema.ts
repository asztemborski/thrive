import { EntitySchema } from '@mikro-orm/core';
import { Member } from '../../domain/entities/member.entity';
import { Workspace } from '../../domain/entities';

export const MemberEntitySchema = new EntitySchema<unknown>({
  class: Member,
  properties: {
    _id: { name: 'id', type: 'uuid', primary: true },
    _name: { name: 'name', type: 'varchar' },
    _workspaceId: {
      name: 'workspace_id',
      kind: 'm:1',
      entity: Workspace.name,
      mapToPk: true,
      primary: true,
    },
    id: { type: 'method', getter: true, persist: false },
    name: { type: 'method', getter: true, persist: false },
    workspaceId: { type: 'method', getter: true, persist: false },
  },
  primaryKeys: ['_id' as never, '_workspaceId' as never],
  schema: 'collaboration',
});
