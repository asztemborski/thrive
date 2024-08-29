import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { IMemberRepository } from '../../organization/contracts';
import { UserPayload } from '@packages/nest-api';

@Injectable()
export class OrganizationMemberGuard implements CanActivate {
  constructor(
    @Inject(IMemberRepository)
    private readonly memberRepository: IMemberRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const organizationId = request.params.organizationId;
    const userHeader = request.headers['x-user'];

    if (!organizationId || !userHeader) {
      return false;
    }

    const user = JSON.parse(userHeader) as UserPayload;
    return await this.memberRepository.memberExists(user.id, organizationId);
  }
}
