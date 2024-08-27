import { Inject, Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';
import { InjectKysely } from '@packages/nest-kysely';

import { IMemberMapper, IMemberRepository } from '../contracts';
import { OrganizationMember } from '../domain/entities';
import { Database } from '../../database/schema';

@Injectable()
export class MemberRepository implements IMemberRepository {
  constructor(
    @InjectKysely() private readonly db: Kysely<Database>,
    @Inject(IMemberMapper) private readonly memberMapper: IMemberMapper,
  ) {}

  async create(member: OrganizationMember, organizationId: string): Promise<void> {
    const schema = this.memberMapper.toPersistence(member, organizationId);
    await this.db.insertInto('organization.member').values(schema).execute();
  }
}
