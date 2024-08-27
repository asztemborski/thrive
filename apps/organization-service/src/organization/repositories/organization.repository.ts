import { Inject, Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';
import { InjectKysely } from '@packages/nest-kysely';

import { IOrganizationMapper, IOrganizationRepository } from '../contracts';
import { Organization } from '../domain/entities';
import { Database } from '../../database/schema';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(
    @InjectKysely() private readonly db: Kysely<Database>,
    @Inject(IOrganizationMapper) private readonly organizationMapper: IOrganizationMapper,
  ) {}

  async create(organization: Organization): Promise<void> {
    const schema = this.organizationMapper.toPersistence(organization);
    await this.db.insertInto('organization.organization').values(schema).execute();
  }
}
