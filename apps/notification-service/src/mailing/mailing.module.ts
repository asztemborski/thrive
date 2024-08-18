import { Module } from '@nestjs/common';
import { TypedConfigModule } from 'nest-typed-config';
import { configOptions } from './config/mailing.config';
import { serviceProviders } from './services';
import { MailingController } from './mailing.controller';

@Module({
  imports: [TypedConfigModule.forRoot(configOptions)],
  providers: [...serviceProviders],
  controllers: [MailingController],
})
export class MailingModule {}
