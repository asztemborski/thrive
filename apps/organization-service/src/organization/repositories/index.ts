import { Provider } from '@nestjs/common';
import { IMemberRepository, IOrganizationRepository } from '../contracts';
import { MemberRepository } from './member.repository';
import { OrganizationRepository } from './organization.repository';

export * from './organization.repository';
export * from './member.repository';

export const repositoryProviders: Provider[] = [
  { provide: IMemberRepository, useClass: MemberRepository },
  { provide: IOrganizationRepository, useClass: OrganizationRepository },
];
