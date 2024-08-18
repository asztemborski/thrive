import { Allow, IsArray, IsString } from 'class-validator';
import path from 'node:path';
import process from 'node:process';
import { fileLoader, TypedConfigModuleOptions } from 'nest-typed-config';

export class UserConfig {
  @IsArray()
  @IsString({ each: true })
  @Allow()
  readonly bannedEmailProviders: string[];
}

export const configOptions: TypedConfigModuleOptions = {
  schema: UserConfig,
  load: fileLoader({
    basename: 'user.module',
    searchFrom: path.resolve(process.cwd(), 'apps/identity-service'),
    ignoreEnvironmentVariableSubstitution: false,
  }),
};
