import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypedConfigModule } from 'nest-typed-config';
import { Pool } from 'pg';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { InjectKysely, KyselyModule } from '@packages/nest-kysely';
import { RabbitmqModule } from '@packages/nest-rabbitmq';
import { RedisModule } from '@packages/nest-redis';

import { AppConfig, configOptions, RabbitmqConfig, RedisConfig } from './config';
import migrate from './database/migrate';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypedConfigModule.forRoot(configOptions),
    KyselyModule.forRootAsync({
      useFactory: ({ database }: AppConfig) => ({
        dialect: new PostgresDialect({
          pool: new Pool(database),
        }),
        plugins: [new CamelCasePlugin()],
      }),
      inject: [AppConfig],
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
export class AppModule implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppModule.name);

  constructor(@InjectKysely() private readonly db: Kysely<unknown>) {}

  async onApplicationBootstrap(): Promise<void> {
    await migrate(this.db, this.logger);
  }
}
