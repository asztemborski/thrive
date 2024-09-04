import { PrivateController, User, UserPayload } from '@packages/nest-api';
import { Body, Inject, Param, Post, UseGuards } from '@nestjs/common';

import { IInvitationService } from './contracts/invitation-service.contract';
import { CreateInvitationRequestDto } from './dtos';
import { IsOrganizationMemberGuard } from '../common/guards';

@PrivateController({ version: '1', path: 'organization' })
export class PrivateInvitationController {
  constructor(@Inject(IInvitationService) private readonly invitationService: IInvitationService) {}

  @Post(':organizationId/invitation')
  @UseGuards(IsOrganizationMemberGuard)
  async createInvitation(
    @Body() request: CreateInvitationRequestDto,
    @Param('organizationId') organizationId: string,
    @User() user: UserPayload,
  ): Promise<string> {
    const invitation = await this.invitationService.create(
      organizationId,
      user.id,
      request.expiresAt,
    );
    return invitation.id;
  }
}
