import { Inject, Injectable } from '@nestjs/common';

import { IMemberMapper, IMemberRepository } from '../contracts';
import { OrganizationMember } from '../domain/entities';
import { Database } from '../../database/schema';
import { InjectDrizzle } from '@packages/nest-drizzle';
import { members } from '../database';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class MemberRepository implements IMemberRepository {
  constructor(
    @InjectDrizzle() private readonly db: Database,
    @Inject(IMemberMapper) private readonly memberMapper: IMemberMapper,
  ) {}

  async create(member: OrganizationMember, organizationId: string): Promise<void> {
    const schema = this.memberMapper.toPersistence(member, organizationId);
    await this.db.insert(members).values(schema);
  }

  async memberExists(userId: string, organizationId: string): Promise<boolean> {
    const result = await this.db
      .select({ id: members.id })
      .from(members)
      .where(and(eq(members.userId, userId), eq(members.organizationId, organizationId)))
      .limit(1);

    return result[0] !== undefined;
  }
}
