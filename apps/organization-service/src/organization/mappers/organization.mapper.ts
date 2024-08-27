import { Inject, Injectable } from '@nestjs/common';

import { IOrganizationMapper, OrganizationToDomainSchema, IMemberMapper } from '../contracts';
import { Organization } from '../domain/entities';
import { OrganizationSchema } from '../database';
import { OrganizationName } from '../domain/value-objects';

@Injectable()
export class OrganizationMapper implements IOrganizationMapper {
  constructor(@Inject(IMemberMapper) private readonly memberMapper: IMemberMapper) {}

  toPersistence(entity: Organization): OrganizationSchema {
    const properties = entity.getProperties();

    return {
      id: properties.id,
      description: properties.description,
      iconUrl: properties.iconUrl,
      name: properties.name.value,
      ownerId: properties.owner.id,
    };
  }

  toDomain(schema: OrganizationToDomainSchema): Organization {
    const owner = this.memberMapper.toDomain(schema.owner);
    const members = schema.members.map((member) => this.memberMapper.toDomain(member));

    return new Organization({
      ...schema,
      name: new OrganizationName({ value: schema.name }),
      members: members.length ? members : [owner],
      roles: [],
      owner,
    });
  }
}
