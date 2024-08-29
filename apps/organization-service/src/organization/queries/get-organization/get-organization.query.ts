import { IQuery } from '@nestjs/cqrs';

export class GetOrganizationQuery implements IQuery {
  constructor(readonly organizationId: string) {}
}
