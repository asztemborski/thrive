import { Allow, IsDefined, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { fileLoader, TypedConfigModuleOptions } from 'nest-typed-config';
import * as path from 'node:path';
import * as process from 'node:process';

import { DatabaseConfig } from './database.config';
import { RedisConfig } from './redis.config';
import { RabbitmqConfig } from './rabbitmq.config';

export class AppConfig {
  @IsString()
  @Allow()
  readonly frontendUrl: string;

  @Type(() => DatabaseConfig)
  @ValidateNested()
  @IsDefined()
  readonly database: DatabaseConfig;

  @Type(() => RedisConfig)
  @ValidateNested()
  @IsDefined()
  readonly redis: RedisConfig;

  @Type(() => RabbitmqConfig)
  @ValidateNested()
  @IsDefined()
  readonly rabbitmq: RabbitmqConfig;
}

export const configOptions: TypedConfigModuleOptions = {
  schema: AppConfig,
  load: fileLoader({
    basename: 'app.module',
    searchFrom: path.resolve(process.cwd(), 'apps/identity-service'),
    ignoreEnvironmentVariableSubstitution: false,
  }),
};
