import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypedConfigModule } from 'nest-typed-config';
import { InjectKysely, KyselyModule } from '@packages/nest-kysely';
import { Pool } from 'pg';
import { migrate } from '@database/database';

import { OrganizationModule } from './organization/organization.module';
import { AppConfig, configOptions } from './config';

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
    OrganizationModule,
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
