import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';

import { UserPayload } from '@packages/nest-api';
import { IOrganizationRepository } from '../../organization/contracts';

@Injectable()
export class IsOrganizationMemberGuard implements CanActivate {
  constructor(
    @Inject(IOrganizationRepository)
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const organizationId = request.params.organizationId;
    const userHeader = request.headers['x-user'];

    if (!organizationId || !userHeader) {
      return false;
    }

    const user = JSON.parse(userHeader) as UserPayload;
    return await this.organizationRepository.memberExists(organizationId, user.id);
  }
}
