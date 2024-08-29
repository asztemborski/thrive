import { PrivateController } from '@packages/nest-api';
import { Body, Inject, Param, Post, UseGuards } from '@nestjs/common';

import { IInvitationService } from './contracts/invitation-service.contract';
import { CreateInvitationRequestDto } from './dtos';
import { OrganizationMemberGuard } from '../common/guards';

@PrivateController({ version: '1', path: 'organization' })
export class PrivateInvitationController {
  constructor(@Inject(IInvitationService) private readonly invitationService: IInvitationService) {}

  @Post(':organizationId/invitation')
  @UseGuards(OrganizationMemberGuard)
  async createInvitation(
    @Body() request: CreateInvitationRequestDto,
    @Param('organizationId') organizationId: string,
  ): Promise<string> {
    return await this.invitationService.create(organizationId, request.expiresAt);
  }
}
