import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { databaseSchemas } from './database/schemas';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CqrsModule } from '@nestjs/cqrs';
import { eventHandlers } from './features/event-handlers';
import { commandHandlers } from './features/commands';
import { PrivateThreadController } from './thread.controller';

@Module({
  imports: [MikroOrmModule.forFeature(databaseSchemas), EventEmitterModule.forRoot(), CqrsModule],
  controllers: [PrivateThreadController],
  providers: [...eventHandlers, ...commandHandlers],
})
export class ThreadModule {}
