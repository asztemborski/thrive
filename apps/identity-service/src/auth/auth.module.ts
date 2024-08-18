import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypedConfigModule } from 'nest-typed-config';

import { configOptions } from './config/auth.config';
import { PublicAuthController } from './auth.controller';
import { serviceProviders } from './services';
import { commandHandlers } from './commands';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypedConfigModule.forRoot(configOptions),
    CqrsModule,
    JwtModule,
    forwardRef(() => UserModule),
  ],
  controllers: [PublicAuthController],
  providers: [...serviceProviders, ...commandHandlers],
  exports: [...serviceProviders],
})
export class AuthModule {}
