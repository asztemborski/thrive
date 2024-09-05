import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { CreateOrganizationCommand } from './create-organization.command';
import { OrganizationName } from '../../domain/value-objects';
import { IOrganizationRepository } from '../../contracts';
import { Organization } from '../../domain/aggregate-roots';

@CommandHandler(CreateOrganizationCommand)
export class CreateOrganizationCommandHandler
  implements ICommandHandler<CreateOrganizationCommand>
{
  constructor(
    @Inject(IOrganizationRepository)
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(command: CreateOrganizationCommand): Promise<string> {
    const { username, id } = command.user;

    const organization = Organization.create({
      name: new OrganizationName({ value: command.name }),
      description: command.description,
      members: [{ id, name: username }],
    });

    await this.organizationRepository.create(organization);
    return organization.id;
  }
}
