import { forwardRef, Module } from '@nestjs/common';
import { IsWorkspaceMemberGuard } from './guards';
import { WorkspaceModule } from '../workspace/workspace.module';

@Module({
  imports: [forwardRef(() => WorkspaceModule)],
  providers: [IsWorkspaceMemberGuard],
  exports: [IsWorkspaceMemberGuard],
})
export class CommonModule {}
