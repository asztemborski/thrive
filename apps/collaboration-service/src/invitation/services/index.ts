import { Provider } from '@nestjs/common';
import { IInvitationService } from '../contracts/invitation-service.contract';
import { InvitationService } from './invitation.service';
import { IInvitationMapper } from '../contracts/invitation-mapper.contract';
import { InvitationMapper } from './invitation-mapper';

export * from './invitation.service';

export const serviceProviders: Provider[] = [
  { provide: IInvitationService, useClass: InvitationService },
  { provide: IInvitationMapper, useClass: InvitationMapper },
];
