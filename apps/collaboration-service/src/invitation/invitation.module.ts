import { Module } from '@nestjs/common';
import { PrivateInvitationController } from './invitation.controller';
import { IInvitationService } from './contracts';
import { InvitationService } from './invitation.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Invitation } from './database';

const serviceProviders = [
  {
    provide: IInvitationService,
    useClass: InvitationService,
  },
];

@Module({
  imports: [MikroOrmModule.forFeature([Invitation])],
  providers: [...serviceProviders],
  controllers: [PrivateInvitationController],
  exports: [...serviceProviders],
})
export class InvitationModule {}
