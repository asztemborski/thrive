import { PrivateController, PublicController, User, UserPayload } from '@packages/nest-api';
import { Body, Get, Post, Req, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { Request, Response } from 'express';

import { AuthenticateCommand } from './commands/authenticate';
import { AuthenticateRequestDto, AuthTokensDto, LogoutRequestDto, RefreshRequestDto } from './dtos';
import { RefreshCommand } from './commands/refresh';
import { ValidateCommand } from './commands/validate';
import { LogoutCommand } from './commands/logout';
import { LogoutAllCommand } from './commands/logout-all';

@PublicController({ version: '1', path: 'auth' })
export class PublicAuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get('validate')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401 })
  @ApiOperation({ summary: 'Validates access.', description: `Validates user's access token` })
  async validate(@Req() request: Request, @Res() response: Response) {
    const command = new ValidateCommand(request.headers.authorization);
    const claims = await this.commandBus.execute(command);
    response.setHeader('x-user', JSON.stringify(claims));
    response.status(200).send();
  }

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

@PrivateController({ version: '1', path: 'auth' })
export class PrivateAuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('logout')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  @ApiOperation({ summary: 'Logouts user', description: `Revokes user's refresh token` })
  async logout(@Body() request: LogoutRequestDto): Promise<void> {
    const command = new LogoutCommand(request.refreshToken);
    return this.commandBus.execute(command);
  }

  @Get('logout/all')
  @ApiResponse({ status: 200 })
  @ApiOperation({
    summary: 'Logouts user from all devices',
    description: `Revokes all user's refresh tokens`,
  })
  async logoutAll(@User() user: UserPayload): Promise<void> {
    const command = new LogoutAllCommand(user.id);
    return this.commandBus.execute(command);
  }
}
