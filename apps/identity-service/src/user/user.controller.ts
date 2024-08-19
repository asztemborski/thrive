import { PublicController } from '@packages/nest-api';
import { Body, Get, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { SignUpRequestDto } from './dtos';
import { SignUpCommand } from './commands/sign-up';
import { VerifyEmailCommand } from './commands/verify-email';

@PublicController({ version: '1', path: 'user' })
export class PublicUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('sign-up')
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400 })
  @ApiOperation({
    summary: 'Registers a new user.',
    description: 'Register a new user based on the request.',
  })
  async signUp(@Body() request: SignUpRequestDto): Promise<void> {
    const command = new SignUpCommand(request);
    await this.commandBus.execute(command);
  }

  @Get('verify-email/:token')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  @ApiOperation({
    summary: `Verifies user's email.`,
    description: `Verifies user's email based on token.`,
  })
  async verifyEmail(@Param('token') token: string): Promise<void> {
    const command = new VerifyEmailCommand({ token });
    await this.commandBus.execute(command);
  }
}
