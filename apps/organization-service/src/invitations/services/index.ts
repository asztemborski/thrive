import { Provider } from '@nestjs/common';
import { IInvitationService } from '../contracts/invitation-service.contract';
import { InvitationService } from './invitation.service';

export * from './invitation.service';

export const serviceProviders: Provider[] = [
  { provide: IInvitationService, useClass: InvitationService },
];
