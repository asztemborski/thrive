import { Inject, Injectable } from '@nestjs/common';

import { IOrganizationMapper, IOrganizationRepository } from '../contracts';
import { Organization } from '../domain/entities';
import { Database } from '../../database/schema';
import { InjectDrizzle } from '@packages/nest-drizzle';
import { organizations } from '../database';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(
    @InjectDrizzle() private readonly db: Database,
    @Inject(IOrganizationMapper) private readonly organizationMapper: IOrganizationMapper,
  ) {}

  async create(organization: Organization): Promise<void> {
    const schema = this.organizationMapper.toPersistence(organization);
    await this.db.insert(organizations).values(schema);
  }
}
