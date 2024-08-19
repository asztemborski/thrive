import { Allow, IsArray, IsBoolean, IsString } from 'class-validator';
import path from 'node:path';
import process from 'node:process';
import { fileLoader, TypedConfigModuleOptions } from 'nest-typed-config';
import { Type } from 'class-transformer';
import { StringValue } from 'ms';

export class UserConfig {
  @IsArray()
  @IsString({ each: true })
  @Allow()
  readonly bannedEmailProviders: string[];

  @IsString()
  @Allow()
  readonly emailVerificationUrl: string;

  @Type(() => Boolean)
  @IsBoolean()
  @Allow()
  readonly emailVerificationDisabled: boolean;

  @IsString()
  @Allow()
  readonly emailVerificationTokenExpirationTime: StringValue;
}

export const configOptions: TypedConfigModuleOptions = {
  schema: UserConfig,
  load: fileLoader({
    basename: 'user.module',
    searchFrom: path.resolve(process.cwd(), 'apps/identity-service'),
    ignoreEnvironmentVariableSubstitution: false,
  }),
};
