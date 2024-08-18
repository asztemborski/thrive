import { Module } from '@nestjs/common';
import { TypedConfigModule } from 'nest-typed-config';
import { configOptions } from './config/auth.config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PublicAuthController } from './auth.controller';
import { serviceProviders } from './services';

@Module({
  imports: [TypedConfigModule.forRoot(configOptions), CqrsModule, JwtModule],
  controllers: [PublicAuthController],
  providers: [...serviceProviders],
})
export class AuthModule {}
