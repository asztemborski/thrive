import { Allow, IsDefined, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AuthConfig } from './auth.config';
import { fileLoader, TypedConfigModuleOptions } from 'nest-typed-config';
import path from 'node:path';
import process from 'node:process';

export class MailingConfig {
  @IsString()
  @Allow()
  readonly host: string;

  @Type(() => Number)
  @IsNumber()
  @Allow()
  readonly port: number;

  @IsString()
  @Allow()
  readonly displayName: string;

  @IsString()
  @Allow()
  readonly mail: string;

  @Type(() => AuthConfig)
  @ValidateNested()
  @IsDefined()
  readonly auth: AuthConfig;
}

export const configOptions: TypedConfigModuleOptions = {
  schema: MailingConfig,
  load: fileLoader({
    basename: 'mailing.module',
    searchFrom: path.resolve(process.cwd(), 'apps/notification-service'),
    ignoreEnvironmentVariableSubstitution: false,
  }),
};
