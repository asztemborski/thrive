import { Provider } from '@nestjs/common';
import { IMemberMapper, IWorkspaceMapper } from '../contracts';
import { MemberMapper } from './member.mapper';
import { WorkspaceMapper } from './workspace.mapper';

export * from './workspace.mapper';
export * from './member.mapper';

export const mapperProviders: Provider[] = [
  { provide: IMemberMapper, useClass: MemberMapper },
  { provide: IWorkspaceMapper, useClass: WorkspaceMapper },
];
