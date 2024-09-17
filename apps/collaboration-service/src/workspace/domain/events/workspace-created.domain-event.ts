import { DomainEvent } from '@packages/nest-ddd';
import { Workspace } from '../entities';

export class WorkspaceCreatedDomainEvent extends DomainEvent {
  constructor(readonly workspace: Workspace) {
    super();
  }
}
