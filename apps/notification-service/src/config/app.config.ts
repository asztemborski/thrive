import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';

import { RabbitmqConfig } from './rabbitmq.config';
import path from 'node:path';
import process from 'node:process';
import { fileLoader, TypedConfigModuleOptions } from 'nest-typed-config';

export class AppConfig {
  @Type(() => RabbitmqConfig)
  @ValidateNested()
  @IsDefined()
  readonly rabbitmq: RabbitmqConfig;
}

export const configOptions: TypedConfigModuleOptions = {
  schema: AppConfig,
  load: fileLoader({
    basename: 'app.module',
    searchFrom: path.resolve(process.cwd(), 'apps/notification-service'),
    ignoreEnvironmentVariableSubstitution: false,
  }),
};
