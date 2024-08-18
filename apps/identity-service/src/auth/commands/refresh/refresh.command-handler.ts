import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { RefreshCommand } from './refresh.command';
import { AuthTokensDto } from '../../dtos';
import { ITokenService } from '../../contracts';
import { UnauthorizedException } from '../../exceptions';
import { IUserRepository } from '../../../user/contracts';

@CommandHandler(RefreshCommand)
export class RefreshCommandHandler implements ICommandHandler<RefreshCommand> {
  constructor(
    @Inject(ITokenService) private readonly tokenService: ITokenService,
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: RefreshCommand): Promise<AuthTokensDto> {
    const userId = await this.tokenService.revokeRefreshToken(command.refreshToken);

    if (!userId) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.tokenService.generateAccess(user);
  }
}
