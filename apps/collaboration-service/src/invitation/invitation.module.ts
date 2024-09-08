import { forwardRef, Module } from '@nestjs/common';
import { PrivateInvitationController } from './invitation.controller';
import { serviceProviders } from './services';

import { CommonModule } from '../common/common.module';
import { IInvitationRepository } from './contracts/invitation-repository.contract';
import { InvitationRepository } from './database/invitation.repository';
import { WorkspaceModule } from '../workspace/workspace.module';

@Module({
  imports: [CommonModule, forwardRef(() => WorkspaceModule)],
  providers: [
    ...serviceProviders,
    { provide: IInvitationRepository, useClass: InvitationRepository },
  ],
  controllers: [PrivateInvitationController],
  exports: [...serviceProviders],
})
export class InvitationModule {}
