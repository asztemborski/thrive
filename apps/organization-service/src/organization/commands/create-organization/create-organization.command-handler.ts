import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { CreateOrganizationCommand } from './create-organization.command';
import { Organization, OrganizationMember } from '../../domain/entities';
import { OrganizationName } from '../../domain/value-objects';
import { IMemberRepository, IOrganizationRepository } from '../../contracts';

@CommandHandler(CreateOrganizationCommand)
export class CreateOrganizationCommandHandler
  implements ICommandHandler<CreateOrganizationCommand>
{
  constructor(
    @Inject(IOrganizationRepository)
    private readonly organizationRepository: IOrganizationRepository,
    @Inject(IMemberRepository) private readonly memberRepository: IMemberRepository,
  ) {}

  async execute(command: CreateOrganizationCommand): Promise<string> {
    const { username, id } = command.user;

    const owner = OrganizationMember.create({
      name: username,
      userId: id,
    });

    const organization = Organization.create({
      name: new OrganizationName({ value: command.name }),
      description: command.description,
    });

    organization.addMember(owner);
    await this.organizationRepository.create(organization);
    await this.memberRepository.create(owner, organization.id);

    return organization.id;
  }
}
