import { CommandBus } from '@nestjs/cqrs';
import { Body, Post } from '@nestjs/common';
import { PrivateController, User, UserPayload } from '@packages/nest-api';

import { CreateInvitationRequestDto, CreateOrganizationRequestDto } from './dtos';
import { CreateInvitationCommand, CreateOrganizationCommand } from './commands';

@PrivateController({ version: '1', path: 'organization' })
export class PrivateOrganizationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createOrganization(
    @Body() request: CreateOrganizationRequestDto,
    @User() user: UserPayload,
  ): Promise<string> {
    const command = new CreateOrganizationCommand({ ...request, user });
    return await this.commandBus.execute(command);
  }

  @Post('invitation')
  async createInvitation(@Body() request: CreateInvitationRequestDto): Promise<void> {
    const command = new CreateInvitationCommand(request);
    await this.commandBus.execute(command);
  }
}
