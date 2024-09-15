import { Module } from '@nestjs/common';
import { TypedConfigModule } from 'nest-typed-config';

import { configOptions, DatabaseConfig } from './common/config';
import { RedisModule } from '@packages/nest-redis';
import { RedisConfig } from './common/config/redis.config';
import { WorkspaceModule } from './workspace/workspace.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

@Module({
  imports: [
    TypedConfigModule.forRoot(configOptions),
    MikroOrmModule.forRootAsync({
      inject: [DatabaseConfig],
      useFactory: ({ host, database, user, password }: DatabaseConfig) => ({
        driver: PostgreSqlDriver,
        dbName: database,
        host,
        user,
        password,
        autoLoadEntities: true,
        debug: true,
      }),
    }),
    RedisModule.forRootAsync({
      inject: [RedisConfig],
      useFactory: (redisConfig: RedisConfig) => redisConfig,
    }),
    WorkspaceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
