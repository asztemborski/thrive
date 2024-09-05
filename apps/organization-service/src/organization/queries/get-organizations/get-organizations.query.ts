import { IQuery } from '@nestjs/cqrs';

export class GetOrganizationsQuery implements IQuery {
  constructor(readonly userId: string) {}
}
