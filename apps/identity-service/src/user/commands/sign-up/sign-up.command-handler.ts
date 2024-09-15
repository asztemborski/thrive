import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRabbitmq } from '@packages/nest-rabbitmq';
import { ClientProxy } from '@nestjs/microservices';

import { SignUpCommand } from './sign-up.command';
import {
  EmailAlreadyInUseException,
  InvalidEmailProviderException,
  UsernameAlreadyInUseException,
} from '../../exceptions';
import { IUserRepository, IValueHasher } from '../../contracts';
import { UserConfig } from '../../config/user.config';
import { User } from '../../domain/user.entity';
import { ITokenService } from '../../../auth/contracts';
import { AppConfig } from '../../../config';
import { Email } from '../../domain/email.value-object';
import { Username } from '../../domain/username.value-object';

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
  private readonly logger = new Logger(SignUpCommandHandler.name);

  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(IValueHasher) private readonly valueHasher: IValueHasher,
    @Inject(ITokenService) private readonly tokenService: ITokenService,
    @InjectRabbitmq() private readonly rabbitmqClient: ClientProxy,
    private readonly config: UserConfig,
    private readonly appConfig: AppConfig,
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

    const user = new User({
      email: new Email({ address: command.email, isVerified: false }),
      username: new Username({ value: command.username }),
      password: hashedPassword,
    });

    await this.userRepository.insert(user);

    this.logger.log(`Created new user with email address: ${user.email.address}`);

    if (this.config.emailVerificationDisabled) {
      user.verifyEmailAddress();
      await this.userRepository.update(user);
      return this.logger.warn(
        `Email verification disabled. Skipped verification process for user: ${user.email.address}`,
      );
    }

    const emailVerificationToken = await this.tokenService.generateCustomToken(
      'email-verification',
      user.id,
      this.config.emailVerificationTokenExpirationTime,
    );

    const { frontendUrl } = this.appConfig;
    const { emailVerificationUrl } = this.config;

    this.rabbitmqClient.emit('user_created', {
      username: user.username,
      email: user.email.address,
      url: `${frontendUrl}/${emailVerificationUrl}/${emailVerificationToken}`,
    });
  }
}
