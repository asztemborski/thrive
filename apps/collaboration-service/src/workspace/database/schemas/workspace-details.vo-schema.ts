import { EntitySchema } from '@mikro-orm/core';
import { WorkspaceDetailsProperties } from '../../domain/value-objects';

export const WorkspaceDetailsVoSchema = new EntitySchema<WorkspaceDetailsProperties>({
  name: 'WorkspaceDetailsVoSchema',
  embeddable: true,
  properties: {
    name: { type: 'varchar' },
    description: { type: 'text' },
  },
});
