import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';

import { UserPayload } from '@packages/nest-api';
import { IWorkspaceRepository } from '../../workspace/contracts';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Workspace } from '../../workspace/domain/entities';

@Injectable()
export class IsWorkspaceMemberGuard implements CanActivate {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: IWorkspaceRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const workspaceId = request.params.workspaceId;
    const userHeader = request.headers['x-user'];

    if (!workspaceId || !userHeader) {
      return false;
    }

    const user = JSON.parse(userHeader) as UserPayload;
    return this.workspaceRepository.memberExists(workspaceId, user.id);
  }
}
