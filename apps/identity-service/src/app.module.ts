import { Module } from '@nestjs/common';
import { TypedConfigModule } from 'nest-typed-config';

import { RabbitmqModule } from '@packages/nest-rabbitmq';
import { RedisModule } from '@packages/nest-redis';

import { configOptions, DatabaseConfig, RabbitmqConfig, RedisConfig } from './config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

@Module({
  imports: [
    TypedConfigModule.forRoot(configOptions),
    MikroOrmModule.forRootAsync({
      inject: [DatabaseConfig],
      useFactory: ({ database, ...config }: DatabaseConfig) => ({
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
    RabbitmqModule.forRootAsync([
      {
        useFactory: (config: RabbitmqConfig) => ({
          urls: [config.url],
          queue: config.queue,
        }),
        inject: [RabbitmqConfig],
      },
    ]),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
