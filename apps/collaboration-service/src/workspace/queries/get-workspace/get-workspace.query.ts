import { IQuery } from '@nestjs/cqrs';

export class GetWorkspaceQuery implements IQuery {
  constructor(readonly workspaceId: string) {}
}
