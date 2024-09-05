import { Inject, Injectable } from '@nestjs/common';

import { IMemberMapper, IOrganizationMapper, IOrganizationRepository } from '../contracts';
import { Database } from '../../database/schema';
import { InjectDrizzle } from '@packages/nest-drizzle';
import { members, organizations } from '../database';
import { and, eq } from 'drizzle-orm';
import { Organization } from '../domain/aggregate-roots';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(
    @InjectDrizzle() private readonly db: Database,
    @Inject(IOrganizationMapper) private readonly organizationMapper: IOrganizationMapper,
    @Inject(IMemberMapper) private readonly memberMapper: IMemberMapper,
  ) {}

  async getById(organizationId: string): Promise<Organization | undefined> {
    const organization = await this.db.query.organizations.findFirst({
      where: (organization) => eq(organization.id, organizationId),
      with: {
        members: true,
      },
    });

    return organization && this.organizationMapper.toDomain(organization);
  }

  async getMemberOrganizations(memberId: string): Promise<Organization[]> {
    const organizations = await this.db.query.organizations.findMany({
      with: {
        members: {
          where: eq(members.id, memberId),
        },
      },
    });

    return organizations.map((organization) =>
      this.organizationMapper.toDomain({ ...organization, members: [] }),
    );
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
    const organizationSchema = this.organizationMapper.toPersistence(organization);
    const membersSchema = organization.members.map((member) =>
      this.memberMapper.toPersistence(member, organization.id),
    );
    await this.db.transaction(async (tx) => {
      await tx.insert(organizations).values(organizationSchema);
      await tx.insert(members).values(membersSchema);
    });
  }

  async saveMember(organization: Organization, memberId: string): Promise<void> {
    const member = organization.members.find((member) => member.id === memberId);

    if (!member) return;

    const schema = this.memberMapper.toPersistence(member, organization.id);
    await this.db.insert(members).values(schema);
  }

  async memberExists(id: string, memberId: string): Promise<boolean> {
    const result = await this.db
      .select({ id: members.id })
      .from(members)
      .where(and(eq(members.id, memberId), eq(members.organizationId, id)))
      .limit(1);

    return result[0] !== undefined;
  }
}
