import { IQuery } from '@nestjs/cqrs';

export class WorkspaceDetailsQuery implements IQuery {
  constructor(readonly workspaceId: string) {}
}
