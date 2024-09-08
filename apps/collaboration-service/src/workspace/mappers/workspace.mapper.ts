import { Inject, Injectable } from '@nestjs/common';

import { IWorkspaceMapper, IMemberMapper, WorkspaceToDomainSchema } from '../contracts';
import { WorkspaceSchema } from '../database';
import { WorkspaceName } from '../domain/value-objects';
import { Workspace } from '../domain/aggregate-roots';

@Injectable()
export class WorkspaceMapper implements IWorkspaceMapper {
  constructor(@Inject(IMemberMapper) private readonly memberMapper: IMemberMapper) {}

  toPersistence(entity: Workspace): WorkspaceSchema {
    const properties = entity.getProperties();

    return {
      id: properties.id,
      description: properties.description,
      iconUrl: properties.iconUrl,
      name: properties.name.value,
    };
  }

  toDomain(schema: WorkspaceToDomainSchema): Workspace {
    const members = schema.members.map((member) => this.memberMapper.toDomain(member));

    return new Workspace({
      ...schema,
      name: new WorkspaceName({ value: schema.name }),
      members,
      roles: [],
    });
  }
}
