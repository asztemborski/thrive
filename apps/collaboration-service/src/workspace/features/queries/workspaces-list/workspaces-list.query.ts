import { IQuery } from '@nestjs/cqrs';

export class WorkspacesListQuery implements IQuery {
  constructor(readonly userId: string) {}
}
