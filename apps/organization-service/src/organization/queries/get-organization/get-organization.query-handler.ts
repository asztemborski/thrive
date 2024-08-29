import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrganizationQuery } from './get-organization.query';
import { Inject } from '@nestjs/common';
import { IOrganizationRepository } from '../../contracts';
import { GetOrganizationResponseDto } from '../../dtos';
import { OrganizationNotFoundException } from '../../exceptions/exceptions';
import { plainToClass } from 'class-transformer';

@QueryHandler(GetOrganizationQuery)
export class GetOrganizationQueryHandler implements IQueryHandler<GetOrganizationQuery> {
  constructor(
    @Inject(IOrganizationRepository)
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(query: GetOrganizationQuery): Promise<GetOrganizationResponseDto> {
    const organization = await this.organizationRepository.getById(query.organizationId);

    if (!organization) {
      throw new OrganizationNotFoundException();
    }

    return plainToClass(
      GetOrganizationResponseDto,
      {
        ...organization.getProperties(),
        name: organization.name,
      },
      { excludeExtraneousValues: true },
    );
  }
}
