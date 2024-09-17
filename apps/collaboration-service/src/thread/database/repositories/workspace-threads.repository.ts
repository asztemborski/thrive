import { BaseEntityRepository } from '@packages/database-utilities';
import { WorkspaceThreads } from '../../domain/entities';
import { WorkspaceThreadsPrivateProperties } from '../schemas';

export class WorkspaceThreadsRepository extends BaseEntityRepository<
  WorkspaceThreads,
  WorkspaceThreadsPrivateProperties
> {}
