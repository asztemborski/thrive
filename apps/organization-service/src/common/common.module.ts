import { forwardRef, Module } from '@nestjs/common';
import { OrganizationMemberGuard } from './guards';
import { OrganizationModule } from '../organization/organization.module';

@Module({
  imports: [forwardRef(() => OrganizationModule)],
  providers: [OrganizationMemberGuard],
  exports: [OrganizationMemberGuard],
})
export class CommonModule {}
