import { Inject, Injectable } from '@nestjs/common';

import { IOrganizationMapper, OrganizationToDomainSchema, IMemberMapper } from '../contracts';
import { OrganizationSchema } from '../database';
import { OrganizationName } from '../domain/value-objects';
import { Organization } from '../domain/aggregate-roots';

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
    };
  }

  toDomain(schema: OrganizationToDomainSchema): Organization {
    const members = schema.members.map((member) => this.memberMapper.toDomain(member));

    return new Organization({
      ...schema,
      name: new OrganizationName({ value: schema.name }),
      members,
      roles: [],
    });
  }
}
