import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SignUpCommand } from './sign-up.command';
import {
  EmailAlreadyInUseException,
  InvalidEmailProviderException,
  UsernameAlreadyInUseException,
} from '../../exceptions';
import { IUserRepository, IValueHasher } from '../../contracts';
import { UserConfig } from '../../config/user.config';
import { User } from '../../domain/user.entity';

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
  private readonly logger = new Logger(SignUpCommandHandler.name);

  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(IValueHasher) private readonly valueHasher: IValueHasher,
    private readonly config: UserConfig,
  ) {}

  async execute(command: SignUpCommand): Promise<void> {
    const emailProvider = command.email.split('@').pop();

    if (
      !emailProvider ||
      this.config.bannedEmailProviders.some((provider) => provider === emailProvider)
    ) {
      throw new InvalidEmailProviderException(emailProvider ?? '');
    }

    const [isEmailUnique, isUsernameUnique] = await this.userRepository.isUnique(
      command.email,
      command.username,
    );

    if (!isEmailUnique) throw new EmailAlreadyInUseException(command.email);

    if (!isUsernameUnique) throw new UsernameAlreadyInUseException(command.username);

    const hashedPassword = await this.valueHasher.hash(command.password);
    const account = User.create({ ...command, password: hashedPassword });
    await this.userRepository.insert(account);

    this.logger.log(`Created new account with email address: ${account.email.address}`);
  }
}
