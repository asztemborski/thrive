import { ConfigurableModuleBuilder } from "@nestjs/common";

import { Options, PostgresType } from "postgres";
import { DrizzleConfig as DefaultDrizzleConfig } from "drizzle-orm";

export type DatabaseSchema = { [key: string]: unknown };

export type PostgresConfig = Options<{ [key: string]: PostgresType }>;

export interface DrizzleConfig {
  readonly connectionUrl?: string;
  readonly connectionConfig?: PostgresConfig;
  readonly options?: DefaultDrizzleConfig<DatabaseSchema>;
}

export const {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
  MODULE_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<DrizzleConfig>().build();
