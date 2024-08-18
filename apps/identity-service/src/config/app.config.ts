import { Allow, IsDefined, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { fileLoader, TypedConfigModuleOptions } from 'nest-typed-config';
import * as path from 'node:path';
import * as process from 'node:process';

import { DatabaseConfig } from './database.config';

export class AppConfig {
  @IsString()
  @Allow()
  readonly frontendUrl: string;

  @Type(() => DatabaseConfig)
  @ValidateNested()
  @IsDefined()
  readonly database: DatabaseConfig;
}

export const configOptions: TypedConfigModuleOptions = {
  schema: AppConfig,
  load: fileLoader({
    basename: 'app.module',
    searchFrom: path.resolve(process.cwd(), 'apps/identity-service'),
    ignoreEnvironmentVariableSubstitution: false,
  }),
};
