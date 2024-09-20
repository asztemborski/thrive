import { Module } from '@nestjs/common';
import { TypedConfigModule } from 'nest-typed-config';

import { configOptions, DatabaseConfig } from './common/config';
import { RedisModule } from '@packages/nest-redis';
import { RedisConfig } from './common/config/redis.config';
import { WorkspaceModule } from './workspace/workspace.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ThreadModule } from './thread/thread.module';

@Module({
  imports: [
    TypedConfigModule.forRoot(configOptions),
    MikroOrmModule.forRootAsync({
      inject: [DatabaseConfig],
      useFactory: ({  database, ...config }: DatabaseConfig) => ({
        driver: PostgreSqlDriver,
        dbName: database,
        ...config,
        autoLoadEntities: true,
      }),
    }),
    RedisModule.forRootAsync({
      inject: [RedisConfig],
      useFactory: (redisConfig: RedisConfig) => redisConfig,
    }),
    ThreadModule,
    WorkspaceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
