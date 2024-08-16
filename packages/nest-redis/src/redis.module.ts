import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { RedisOptions } from "ioredis";
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from "./redis-module.options";
import { RedisService } from "./redis.service";

import { REDIS_CLIENT } from "./redis.decorator";

@Global()
@Module({})
export class RedisModule extends ConfigurableModuleClass {
  static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    const { providers = [], exports = [], ...rest } = super.register(options);

    const redisProviders: Provider[] = [
      RedisService,
      {
        provide: REDIS_CLIENT,
        useFactory: (redisService: RedisService) =>
          redisService.getClient(options),
        inject: [RedisService],
      },
    ];

    return {
      ...rest,
      providers: [...providers, ...redisProviders],
      exports: [...exports, REDIS_CLIENT],
    };
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const {
      providers = [],
      exports = [],
      ...rest
    } = super.registerAsync(options);

    const redisAsyncProviders: Provider[] = [
      RedisService,
      {
        provide: REDIS_CLIENT,
        useFactory: (redisService: RedisService, config: RedisOptions) =>
          redisService.getClient(config),
        inject: [RedisService, MODULE_OPTIONS_TOKEN],
      },
    ];

    return {
      ...rest,
      providers: [...providers, ...redisAsyncProviders],
      exports: [...exports, REDIS_CLIENT],
    };
  }
}
