import { PrivateController, User, UserPayload } from '@packages/nest-api';
import { Body, Inject, Param, Post, UseGuards } from '@nestjs/common';

import { IInvitationService } from './contracts/invitation-service.contract';
import { CreateInvitationRequestDto } from './dtos';
import { IsWorkspaceMemberGuard } from '../common/guards';

@PrivateController({ version: '1', path: 'workspace' })
export class PrivateInvitationController {
  constructor(@Inject(IInvitationService) private readonly invitationService: IInvitationService) {}

  @Post(':workspaceId/invitation')
  @UseGuards(IsWorkspaceMemberGuard)
  async createInvitation(
    @Body() request: CreateInvitationRequestDto,
    @Param('workspaceId') workspaceId: string,
    @User() user: UserPayload,
  ): Promise<string> {
    const invitation = await this.invitationService.create(workspaceId, user.id, request.expiresAt);
    return invitation.id;
  }
}
