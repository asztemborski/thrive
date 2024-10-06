import { PrivateController, User, UserPayload } from '@packages/nest-api';
import { Body, Inject, Param, Post } from '@nestjs/common';
import { IInvitationService } from './contracts';
import { CreateInvitationRequestDto } from './dtos';

@PrivateController({ version: '1', tag: 'workspace', path: 'workspace/:workspaceId/invitation' })
export class PrivateInvitationController {
  constructor(@Inject(IInvitationService) private readonly invitationService: IInvitationService) {}

  @Post()
  async createInvitation(
    @Param('workspaceId') workspaceId: string,
    @User() user: UserPayload,
    @Body() request: CreateInvitationRequestDto,
  ): Promise<string> {
    return this.invitationService.create({
      workspaceId,
      createdBy: user.id,
      expiresAt: request.expiresAt,
    });
  }
}
