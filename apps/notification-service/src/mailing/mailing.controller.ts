import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { UserCreatedEventDto } from './dtos';
import { PasswordResetEventDto } from './dtos/password-reset-event.dto';
import { IMailingService } from './contracts/mailing-service.contract';

@Controller()
export class MailingController {
  constructor(@Inject(IMailingService) private readonly mailingService: IMailingService) {}

  @EventPattern('user_created')
  async sendEmailVerification(@Payload() data: UserCreatedEventDto): Promise<void> {
    await this.mailingService.sendVerification(data.email, data.url, data.username);
  }

  @EventPattern('password_reset_request')
  async sendPasswordReset(@Payload() data: PasswordResetEventDto): Promise<void> {
    await this.mailingService.sendPasswordReset(data.email, data.url, data.username);
  }
}
