import { forwardRef, Module } from '@nestjs/common';
import { PublicUserController } from './user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypedConfigModule } from 'nest-typed-config';

import { configOptions } from './config/user.config';
import { commandHandlers } from './commands';
import { serviceProviders } from './services';
import { repositoryProviders } from './database';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypedConfigModule.forRoot(configOptions), CqrsModule, forwardRef(() => AuthModule)],
  controllers: [PublicUserController],
  providers: [...commandHandlers, ...serviceProviders, ...repositoryProviders],
  exports: [...serviceProviders, ...repositoryProviders],
})
export class UserModule {}
