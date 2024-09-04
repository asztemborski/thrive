import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Body, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PrivateController, User, UserPayload } from '@packages/nest-api';

import { CreateOrganizationRequestDto, GetOrganizationResponseDto } from './dtos';
import { CreateOrganizationCommand } from './commands';
import { GetOrganizationQuery } from './queries/get-organization';
import { IsOrganizationMemberGuard } from '../common/guards';
import { AddMemberCommand } from './commands/add-member/add-member.command';

@PrivateController({ version: '1', path: 'organization' })
export class PrivateOrganizationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createOrganization(
    @Body() request: CreateOrganizationRequestDto,
    @User() user: UserPayload,
  ): Promise<string> {
    const command = new CreateOrganizationCommand({ ...request, user });
    return await this.commandBus.execute(command);
  }

  @Get(':organizationId')
  @UseGuards(IsOrganizationMemberGuard)
  async getOrganization(
    @Param('organizationId') organizationId: string,
  ): Promise<GetOrganizationResponseDto> {
    const query = new GetOrganizationQuery(organizationId);
    return await this.queryBus.execute(query);
  }

  @Get('join/:invitationId')
  async joinOrganization(
    @Param('invitationId') invitationId: string,
    @User() user: UserPayload,
  ): Promise<void> {
    const command = new AddMemberCommand({
      userId: user.id,
      memberName: user.username,
      invitationId,
    });
    await this.commandBus.execute(command);
  }
}
