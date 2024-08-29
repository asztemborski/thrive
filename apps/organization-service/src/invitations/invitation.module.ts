import { Module } from '@nestjs/common';
import { PrivateInvitationController } from './invitation.controller';
import { serviceProviders } from './services';
import { OrganizationModule } from '../organization/organization.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule, OrganizationModule],
  providers: [...serviceProviders],
  controllers: [PrivateInvitationController],
})
export class InvitationModule {}
