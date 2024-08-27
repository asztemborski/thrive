import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrivateOrganizationController } from './organization.controller';
import { repositoryProviders } from './repositories';
import { mapperProviders } from './mappers';
import { commandHandlers } from './commands';

@Module({
  imports: [CqrsModule],
  controllers: [PrivateOrganizationController],
  providers: [...repositoryProviders, ...mapperProviders, ...commandHandlers],
})
export class OrganizationModule {}
