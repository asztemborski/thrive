import { Inject, Injectable } from '@nestjs/common';
import { IInvitationService } from '../contracts/invitation-service.contract';
import { InjectRedis } from '@packages/nest-redis';
import Redis from 'ioredis';
import { IOrganizationRepository } from '../../organization/contracts';
import { OrganizationDoesNotExistException } from '../exceptions/exceptions';
import crypto from 'node:crypto';

@Injectable()
export class InvitationService implements IInvitationService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    @Inject(IOrganizationRepository)
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async create(organizationId: string, expiresAt: Date | undefined): Promise<string> {
    const organizationExists = await this.organizationRepository.exists(organizationId);

    if (!organizationExists) {
      throw new OrganizationDoesNotExistException();
    }

    const invitationId = crypto.randomBytes(20).toString('hex');

    if (expiresAt) {
      const expiresIn = new Date().getTime() - expiresAt.getTime();
      this.redis.set(invitationId, organizationId, 'PX', expiresIn);
      return invitationId;
    }

    await this.redis.set(invitationId, organizationId);
    return invitationId;
  }
}
