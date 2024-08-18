import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypedConfigModule } from 'nest-typed-config';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { InjectKysely, KyselyModule } from '@packages/nest-kysely';

import { AppConfig, configOptions } from './config';
import migrate from './database/migrate';

@Module({
  imports: [
    TypedConfigModule.forRoot(configOptions),
    KyselyModule.forRootAsync({
      useFactory: ({ database }: AppConfig) => ({
        dialect: new PostgresDialect({
          pool: new Pool(database),
        }),
      }),
      inject: [AppConfig],
    }),
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
