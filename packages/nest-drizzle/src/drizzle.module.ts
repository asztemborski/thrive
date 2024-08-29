import { DynamicModule, Global } from "@nestjs/common";

import { DRIZZLE_CLIENT } from "./drizzle.decorator";
import { DrizzleService } from "./drizzle.service";
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  DrizzleConfig,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from "./drizzle.module.options";

@Global()
export class DrizzleModule extends ConfigurableModuleClass {
  static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    const { providers = [], exports = [], ...rest } = super.register(options);

    const databaseProviders = [
      DrizzleService,
      {
        provide: DRIZZLE_CLIENT,
        useFactory: (databaseService: DrizzleService) =>
          databaseService.getClient(options),
        inject: [DrizzleService],
      },
    ];

    return {
      ...rest,
      providers: [...providers, ...databaseProviders],
      exports: [...exports, DRIZZLE_CLIENT],
    };
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const {
      providers = [],
      exports = [],
      ...rest
    } = super.registerAsync(options);

    const databaseAsyncProviders = [
      DrizzleService,
      {
        provide: DRIZZLE_CLIENT,
        useFactory: (databaseService: DrizzleService, config: DrizzleConfig) =>
          databaseService.getClient(config),
        inject: [DrizzleService, MODULE_OPTIONS_TOKEN],
      },
    ];

    return {
      ...rest,
      providers: [...providers, ...databaseAsyncProviders],
      exports: [...exports, DRIZZLE_CLIENT],
    };
  }
}
