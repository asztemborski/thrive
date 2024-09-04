import { forwardRef, Module } from '@nestjs/common';
import { PrivateInvitationController } from './invitation.controller';
import { serviceProviders } from './services';
import { OrganizationModule } from '../organization/organization.module';
import { CommonModule } from '../common/common.module';
import { IInvitationRepository } from './contracts/invitation-repository.contract';
import { InvitationRepository } from './database/invitation.repository';

@Module({
  imports: [CommonModule, forwardRef(() => OrganizationModule)],
  providers: [
    ...serviceProviders,
    { provide: IInvitationRepository, useClass: InvitationRepository },
  ],
  controllers: [PrivateInvitationController],
  exports: [...serviceProviders],
})
export class InvitationModule {}
