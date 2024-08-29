import { Module } from '@nestjs/common';
import { TypedConfigModule } from 'nest-typed-config';

import { OrganizationModule } from './organization/organization.module';
import { configOptions, DatabaseConfig } from './config';
import { DrizzleModule } from '@packages/nest-drizzle';
import { schema } from './database/schema';
import { InvitationModule } from './invitations/invitation.module';
import { RedisModule } from '@packages/nest-redis';
import { RedisConfig } from './config/redis.config';

@Module({
  imports: [
    TypedConfigModule.forRoot(configOptions),
    DrizzleModule.forRootAsync({
      inject: [DatabaseConfig],
      useFactory: (databaseConfig: DatabaseConfig) => ({
        connectionConfig: { ...databaseConfig },
        options: { schema: schema },
      }),
    }),
    RedisModule.forRootAsync({
      inject: [RedisConfig],
      useFactory: (redisConfig: RedisConfig) => redisConfig,
    }),
    OrganizationModule,
    InvitationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
