import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypedConfigModule } from 'nest-typed-config';

import { configOptions } from './config/auth.config';
import { PublicAuthController } from './auth.controller';
import { serviceProviders } from './services';
import { commandHandlers } from './commands';

@Module({
  imports: [TypedConfigModule.forRoot(configOptions), CqrsModule, JwtModule],
  controllers: [PublicAuthController],
  providers: [...serviceProviders, ...commandHandlers],
})
export class AuthModule {}
