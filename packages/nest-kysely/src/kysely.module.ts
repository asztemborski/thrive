import { DynamicModule, Global, Provider } from "@nestjs/common";
import { Kysely, KyselyConfig } from "kysely";

import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from "./kysely.module.options";
import { KYSELY_CLIENT } from "./kysely.decorator";

@Global()
export class KyselyModule extends ConfigurableModuleClass {
  static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    const { providers = [], exports = [], ...rest } = super.register(options);

    const kyselyProvider: Provider = {
      provide: KYSELY_CLIENT,
      useValue: new Kysely(options),
    };

    return {
      ...rest,
      providers: [...providers, kyselyProvider],
      exports: [...exports, KYSELY_CLIENT],
    };
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const {
      providers = [],
      exports = [],
      ...rest
    } = super.registerAsync(options);

    const kyselyAsyncProvider: Provider = {
      provide: KYSELY_CLIENT,
      useFactory: (config: KyselyConfig) => new Kysely(config),
      inject: [MODULE_OPTIONS_TOKEN],
    };

    return {
      ...rest,
      providers: [...providers, kyselyAsyncProvider],
      exports: [...exports, KYSELY_CLIENT],
    };
  }
}
