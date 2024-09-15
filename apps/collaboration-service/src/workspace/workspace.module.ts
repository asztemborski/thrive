import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { commandHandlers } from './features/commands';
import { CommonModule } from '../common/common.module';
import { queryHandlers } from './features/queries';

import { PrivateWorkspaceController } from './workspace.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { databaseSchemas } from './database/schemas';

@Module({
  imports: [MikroOrmModule.forFeature([...databaseSchemas]), CqrsModule, CommonModule],
  controllers: [PrivateWorkspaceController],
  providers: [...commandHandlers, ...queryHandlers],
})
export class WorkspaceModule {}
