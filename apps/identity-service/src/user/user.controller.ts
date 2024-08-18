import { PublicController } from '@packages/nest-api';
import { Body, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { SignUpRequestDto } from './dtos';
import { SignUpCommand } from './commands/sign-up';

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
}
