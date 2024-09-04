import { forwardRef, Module } from '@nestjs/common';
import { IsOrganizationMemberGuard } from './guards';
import { OrganizationModule } from '../organization/organization.module';

@Module({
  imports: [forwardRef(() => OrganizationModule)],
  providers: [IsOrganizationMemberGuard],
  exports: [IsOrganizationMemberGuard],
})
export class CommonModule {}
