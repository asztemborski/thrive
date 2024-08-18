import { ConfigurableModuleBuilder } from "@nestjs/common";
import { KyselyConfig } from "kysely";

export const {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
  MODULE_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<KyselyConfig>().build();
