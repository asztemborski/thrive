import { Module } from '@nestjs/common';
import { TypedConfigModule } from 'nest-typed-config';

import { configOptions, DatabaseConfig } from './config';
import { DrizzleModule } from '@packages/nest-drizzle';
import { schema } from './database/schema';

import { RedisModule } from '@packages/nest-redis';
import { RedisConfig } from './config/redis.config';
import { InvitationModule } from './invitation/invitation.module';
import { WorkspaceModule } from './workspace/workspace.module';

@Module({
  imports: [
    TypedConfigModule.forRoot(configOptions),
    DrizzleModule.forRootAsync({
      inject: [DatabaseConfig],
      useFactory: (databaseConfig: DatabaseConfig) => ({
        connectionConfig: { ...databaseConfig },
        options: { schema },
      }),
    }),
    RedisModule.forRootAsync({
      inject: [RedisConfig],
      useFactory: (redisConfig: RedisConfig) => redisConfig,
    }),
    WorkspaceModule,
    InvitationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
