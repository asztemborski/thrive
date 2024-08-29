import { Module } from '@nestjs/common';
import { TypedConfigModule } from 'nest-typed-config';

import { OrganizationModule } from './organization/organization.module';
import { AppConfig, configOptions } from './config';
import { DrizzleModule } from '@packages/nest-drizzle';
import { schema } from './database/schema';

@Module({
  imports: [
    TypedConfigModule.forRoot(configOptions),
    DrizzleModule.forRootAsync({
      inject: [AppConfig],
      useFactory: ({ database }: AppConfig) => ({
        connectionConfig: { ...database },
        options: { schema: schema },
      }),
    }),
    OrganizationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
