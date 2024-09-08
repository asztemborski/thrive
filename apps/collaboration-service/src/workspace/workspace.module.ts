import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { repositoryProviders } from './repositories';
import { mapperProviders } from './mappers';
import { commandHandlers } from './commands';
import { CommonModule } from '../common/common.module';
import { queryHandlers } from './queries';
import { InvitationModule } from '../invitation/invitation.module';
import { PrivateWorkspaceController } from './workspace.controller';

@Module({
  imports: [CqrsModule, forwardRef(() => CommonModule), forwardRef(() => InvitationModule)],
  controllers: [PrivateWorkspaceController],
  providers: [...repositoryProviders, ...mapperProviders, ...commandHandlers, ...queryHandlers],
  exports: [...repositoryProviders, ...mapperProviders],
})
export class WorkspaceModule {}
