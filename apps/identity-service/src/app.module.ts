import { Module } from '@nestjs/common';
import { TypedConfigModule } from 'nest-typed-config';

import { RabbitmqModule } from '@packages/nest-rabbitmq';
import { RedisModule } from '@packages/nest-redis';

import { AppConfig, configOptions, RabbitmqConfig, RedisConfig } from './config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DrizzleModule } from '@packages/nest-drizzle';
import { schema } from './database/schema';

@Module({
  imports: [
    TypedConfigModule.forRoot(configOptions),
    DrizzleModule.forRootAsync({
      inject: [AppConfig],
      useFactory: ({ database }: AppConfig) => ({
        connectionConfig: { ...database },
        options: { schema },
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
