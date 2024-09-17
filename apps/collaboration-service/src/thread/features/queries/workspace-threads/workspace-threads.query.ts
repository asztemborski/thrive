import { IQuery } from '@nestjs/cqrs';

export class WorkspaceThreadsQuery implements IQuery {
  constructor(readonly workspaceId: string) {}
}
