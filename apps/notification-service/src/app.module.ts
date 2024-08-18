import { Module } from '@nestjs/common';
import { TypedConfigModule } from 'nest-typed-config';
import { configOptions } from './config';
import { MailingModule } from './mailing/mailing.module';

@Module({
  imports: [TypedConfigModule.forRoot(configOptions), MailingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
