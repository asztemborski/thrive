import { Provider } from '@nestjs/common';
import { IMemberMapper, IOrganizationMapper } from '../contracts';
import { MemberMapper } from './member.mapper';
import { OrganizationMapper } from './organization.mapper';

export * from './organization.mapper';
export * from './member.mapper';

export const mapperProviders: Provider[] = [
  { provide: IMemberMapper, useClass: MemberMapper },
  { provide: IOrganizationMapper, useClass: OrganizationMapper },
];
