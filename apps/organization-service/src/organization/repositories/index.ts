import { Provider } from '@nestjs/common';
import { IOrganizationRepository } from '../contracts';

import { OrganizationRepository } from './organization.repository';

export * from './organization.repository';

export const repositoryProviders: Provider[] = [
  { provide: IOrganizationRepository, useClass: OrganizationRepository },
];
