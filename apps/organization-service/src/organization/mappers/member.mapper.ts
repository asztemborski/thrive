import { Injectable } from '@nestjs/common';

import { IMemberMapper } from '../contracts';
import { OrganizationMember } from '../domain/entities';
import { MemberSchema } from '../database';

@Injectable()
export class MemberMapper implements IMemberMapper {
  toPersistence(entity: OrganizationMember, organizationId: string): MemberSchema {
    const properties = entity.getProperties();

    return {
      id: properties.id,
      name: properties.name,
      userId: properties.userId,
      organizationId,
    };
  }

  toDomain(schema: MemberSchema): OrganizationMember {
    return new OrganizationMember({
      id: schema.id,
      name: schema.name,
      userId: schema.userId,
      roles: [],
    });
  }
}
