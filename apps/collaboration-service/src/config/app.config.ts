import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { fileLoader, TypedConfigModuleOptions } from 'nest-typed-config';
import * as path from 'node:path';
import * as process from 'node:process';

import { DatabaseConfig } from './database.config';
import { RedisConfig } from './redis.config';

export class AppConfig {
  @Type(() => DatabaseConfig)
  @ValidateNested()
  @IsDefined()
  readonly database: DatabaseConfig;

  @Type(() => RedisConfig)
  @ValidateNested()
  @IsDefined()
  readonly redis: RedisConfig;
}

export const configOptions: TypedConfigModuleOptions = {
  schema: AppConfig,
  load: fileLoader({
    basename: 'app.module',
    searchFrom: path.resolve(process.cwd(), 'apps/collaboration-service'),
    ignoreEnvironmentVariableSubstitution: false,
  }),
};
