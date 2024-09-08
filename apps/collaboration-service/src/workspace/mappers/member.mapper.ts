import { Injectable } from '@nestjs/common';

import { IMemberMapper } from '../contracts';

import { MemberSchema } from '../database';
import { WorkspaceMember } from '../domain/entities';

@Injectable()
export class MemberMapper implements IMemberMapper {
  toPersistence(entity: WorkspaceMember, workspaceId: string): MemberSchema {
    const properties = entity.getProperties();

    return {
      id: properties.id,
      name: properties.name,
      isOwner: properties.isOwner,
      workspaceId,
    };
  }

  toDomain(schema: MemberSchema): WorkspaceMember {
    return new WorkspaceMember({
      id: schema.id,
      name: schema.name,
      roles: [],
      isOwner: schema.isOwner,
    });
  }
}
