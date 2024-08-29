import { Inject, Injectable } from '@nestjs/common';

import { IOrganizationMapper, IOrganizationRepository } from '../contracts';
import { Organization } from '../domain/entities';
import { Database } from '../../database/schema';
import { InjectDrizzle } from '@packages/nest-drizzle';
import { organizations } from '../database';
import { eq } from 'drizzle-orm';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(
    @InjectDrizzle() private readonly db: Database,
    @Inject(IOrganizationMapper) private readonly organizationMapper: IOrganizationMapper,
  ) {}

  async getById(organizationId: string): Promise<Organization | undefined> {
    const organization = await this.db.query.organizations.findFirst({
      where: (organization) => eq(organization.id, organizationId),
      with: {
        members: {
          where: (member) => eq(member.isOwner, true),
        },
      },
    });

    return organization && this.organizationMapper.toDomain(organization);
  }

  async exists(organizationId: string): Promise<boolean> {
    const result = await this.db
      .select({ id: organizations.id })
      .from(organizations)
      .where(eq(organizations.id, organizationId))
      .limit(1);

    return result[0] !== undefined;
  }

  async create(organization: Organization): Promise<void> {
    const schema = this.organizationMapper.toPersistence(organization);
    await this.db.insert(organizations).values(schema);
  }
}
