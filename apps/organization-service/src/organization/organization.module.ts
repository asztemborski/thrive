import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrivateOrganizationController } from './organization.controller';
import { repositoryProviders } from './repositories';
import { mapperProviders } from './mappers';
import { commandHandlers } from './commands';
import { CommonModule } from '../common/common.module';
import { queryHandlers } from './queries';

@Module({
  imports: [CqrsModule, forwardRef(() => CommonModule)],
  controllers: [PrivateOrganizationController],
  providers: [...repositoryProviders, ...mapperProviders, ...commandHandlers, ...queryHandlers],
  exports: [...repositoryProviders, ...mapperProviders],
})
export class OrganizationModule {}
