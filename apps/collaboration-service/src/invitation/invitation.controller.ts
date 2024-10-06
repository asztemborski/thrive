import { PrivateController, User, UserPayload } from '@packages/nest-api';
import { Body, Inject, Param, Post } from '@nestjs/common';
import { IInvitationService } from './contracts';
import { CreateInvitationRequestDto } from './dtos';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@PrivateController({ version: '1', tag: 'workspace', path: 'workspace/:workspaceId/invitation' })
export class PrivateInvitationController {
  constructor(@Inject(IInvitationService) private readonly invitationService: IInvitationService) {}

  @Post()
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 401 })
  @ApiOperation({
    summary: 'Creates new invitation.',
    description: `Creates new invitation to a workspace`,
  })
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
