import { Module } from '@nestjs/common';
import { PrivateOrganizationController } from './organization.controller';

@Module({
  controllers: [PrivateOrganizationController],
})
export class OrganizationModule {}
