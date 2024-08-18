import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { AuthenticateCommand } from './authenticate.command';
import { AuthTokensDto } from '../../dtos';
import { IUserRepository, IValueHasher } from '../../../user/contracts';
import { ITokenService } from '../../contracts';
import { UnauthorizedException } from '../../exceptions';

@CommandHandler(AuthenticateCommand)
export class AuthenticateCommandHandler implements ICommandHandler<AuthenticateCommand> {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(IValueHasher) private readonly valueHasher: IValueHasher,
    @Inject(ITokenService) private readonly tokenService: ITokenService,
  ) {}

  async execute(command: AuthenticateCommand): Promise<AuthTokensDto> {
    const user = await this.userRepository.getByEmail(command.email);

    if (!user || !user.email.isConfirmed) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await this.valueHasher.verify(command.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    return this.tokenService.generateAccess(user);
  }
}
