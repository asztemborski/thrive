import { Provider } from '@nestjs/common';
import { IWorkspaceRepository } from '../contracts';

import { WorkspaceRepository } from './workspace.repository';

export * from './workspace.repository';

export const repositoryProviders: Provider[] = [
  { provide: IWorkspaceRepository, useClass: WorkspaceRepository },
];
