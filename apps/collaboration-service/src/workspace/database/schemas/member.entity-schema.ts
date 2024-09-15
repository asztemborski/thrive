import { EntitySchema } from '@mikro-orm/core';
import { Member } from '../../domain/entities/member.entity';
import { Workspace } from '../../domain/entities';

export const MemberEntitySchema = new EntitySchema<Member>({
  class: Member,
  properties: {
    id: { type: 'uuid', primary: true },
    name: { type: 'varchar' },
    workspaceId: {
      name: 'workspace_id',
      kind: 'm:1',
      entity: () => Workspace,
      mapToPk: true,
      primary: true,
    },
  },
  primaryKeys: ['id', 'workspaceId'],
  schema: 'collaboration',
});
