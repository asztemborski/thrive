import { forwardRef, Module } from '@nestjs/common';
import { IsWorkspaceMemberGuard } from './guards';
import { WorkspaceModule } from '../workspace/workspace.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { WorkspaceEntitySchema } from '../workspace/database/schemas/workspace.entity-schema';

@Module({
  imports: [MikroOrmModule.forFeature([WorkspaceEntitySchema])],
  providers: [IsWorkspaceMemberGuard],
  exports: [IsWorkspaceMemberGuard],
})
export class CommonModule {}
