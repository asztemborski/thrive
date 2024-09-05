import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Inject } from '@nestjs/common';
import { IOrganizationRepository } from '../../contracts';
import { GetOrganizationsQuery } from './get-organizations.query';
import { plainToClass } from 'class-transformer';
import { GetOrganizationResponseDto } from '../../dtos';

@QueryHandler(GetOrganizationsQuery)
export class GetOrganizationsQueryHandler implements IQueryHandler<GetOrganizationsQuery> {
  constructor(
    @Inject(IOrganizationRepository)
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(query: GetOrganizationsQuery): Promise<any> {
    const organizations = await this.organizationRepository.getMemberOrganizations(query.userId);

    return organizations.map((organization) => {
      const properties = organization.getProperties();
      return plainToClass(
        GetOrganizationResponseDto,
        { ...properties, name: organization.name },
        { excludeExtraneousValues: true },
      );
    });
  }
}
