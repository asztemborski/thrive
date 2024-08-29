import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Body, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PrivateController, User, UserPayload } from '@packages/nest-api';

import { CreateOrganizationRequestDto, GetOrganizationResponseDto } from './dtos';
import { CreateOrganizationCommand } from './commands';
import { GetOrganizationQuery } from './queries/get-organization';
import { OrganizationMemberGuard } from '../common/guards';

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
  @UseGuards(OrganizationMemberGuard)
  async getOrganization(
    @Param('organizationId') organizationId: string,
  ): Promise<GetOrganizationResponseDto> {
    const query = new GetOrganizationQuery(organizationId);
    return await this.queryBus.execute(query);
  }
}
