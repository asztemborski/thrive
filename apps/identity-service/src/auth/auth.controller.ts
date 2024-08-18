import { PublicController } from '@packages/nest-api';
import { Body, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthenticateCommand } from './commands/authenticate';
import { AuthenticateRequestDto, AuthTokensDto, RefreshRequestDto } from './dtos';
import { RefreshCommand } from './commands/refresh';

@PublicController({ version: '1', path: 'auth' })
export class PublicAuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('authenticate')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  @ApiOperation({
    summary: 'Authenticates user.',
    description: 'Authenticates and retrieves user auth tokens',
  })
  async authenticate(@Body() request: AuthenticateRequestDto): Promise<AuthTokensDto> {
    const command = new AuthenticateCommand(request);
    return this.commandBus.execute(command);
  }

  @Post('refresh')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  @ApiOperation({ summary: 'Refresh user token.', description: "Refresh user's auth tokens" })
  async refresh(@Body() request: RefreshRequestDto): Promise<AuthTokensDto> {
    const command = new RefreshCommand(request.refreshToken);
    return this.commandBus.execute(command);
  }
}
