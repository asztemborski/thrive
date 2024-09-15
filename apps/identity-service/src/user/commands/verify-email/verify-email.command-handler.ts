import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyEmailCommand } from './verify-email.command';
import { Inject, Logger } from '@nestjs/common';
import { IUserRepository } from '../../contracts';
import { UnauthorizedException } from '../../../auth/exceptions';
import { ITokenService } from '../../../auth/contracts';

@CommandHandler(VerifyEmailCommand)
export class VerifyEmailCommandHandler implements ICommandHandler<VerifyEmailCommand> {
  private readonly logger = new Logger(VerifyEmailCommandHandler.name);

  constructor(
    @Inject(ITokenService) private readonly tokenService: ITokenService,
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: VerifyEmailCommand): Promise<void> {
    const userId = await this.tokenService.retrieveAndDeleteCustomToken(
      'email-verification',
      command.token,
    );
    if (!userId) throw new UnauthorizedException();

    const user = await this.userRepository.getById(userId);
    if (!user) throw new UnauthorizedException();

    user.verifyEmailAddress();
    await this.userRepository.update(user);

    this.logger.log(`User ${user.id} successfully verified`);
  }
}
