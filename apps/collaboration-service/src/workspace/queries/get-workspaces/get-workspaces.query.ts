import { IQuery } from '@nestjs/cqrs';

export class GetWorkspacesQuery implements IQuery {
  constructor(readonly userId: string) {}
}
