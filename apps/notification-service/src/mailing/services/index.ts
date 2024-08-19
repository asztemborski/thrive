import { Provider } from '@nestjs/common';
import { IMailingService } from '../contracts/mailing-service.contract';
import { MailingService } from './mailing.service';

export const serviceProviders: Provider[] = [
  {
    provide: IMailingService,
    useClass: MailingService,
  },
];
