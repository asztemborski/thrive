import { DynamicModule, Global, Module, Provider, Type } from "@nestjs/common";
import {
  ClientsModuleAsyncOptions,
  ClientsProviderAsyncOptions,
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from "./rabbitmq-module.options";
import { RABBITMQ_CLIENT } from "./rabbitmq.decorator";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

@Global()
@Module({})
export class RabbitmqModule extends ConfigurableModuleClass {
  static forRoot(options: (typeof OPTIONS_TYPE)[]): DynamicModule {
    const { providers = [], exports = [], ...rest } = super.register(options);

    const rabbitMqProviders: Provider[] = options.map((opt) => ({
      provide: RABBITMQ_CLIENT(opt.name),
      useValue: ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: opt,
      }),
    }));

    return {
      ...rest,
      providers: [...providers, ...rabbitMqProviders],
      exports: [...exports, ...rabbitMqProviders],
    };
  }

  static forRootAsync(options: ClientsModuleAsyncOptions): DynamicModule {
    const providers = options.reduce(
      (accProviders: Provider[], item) =>
        accProviders
          .concat(this.createAsyncOptionsProvider(item))
          .concat(item.extraProviders || []),
      [],
    );

    const imports = options.reduce(
      (accImports: any[], option) =>
        option.imports && !accImports.includes(option.imports)
          ? accImports.concat(option.imports)
          : accImports,
      [],
    );

    return {
      module: RabbitmqModule,
      global: true,
      imports,
      providers: providers,
      exports: providers,
    };
  }

  private static createAsyncOptionsProvider(
    options: ClientsProviderAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: RABBITMQ_CLIENT(options.name),
        useFactory: this.createFactoryWrapper(options.useFactory),
        inject: options.inject || [],
      };
    }

    return {
      provide: RABBITMQ_CLIENT(options.name),
      useFactory: this.createFactoryWrapper(undefined),
    };
  }

  private static createFactoryWrapper(
    useFactory: ClientsProviderAsyncOptions["useFactory"],
  ) {
    return async (...args: any[]) => {
      if (!useFactory) return;

      const clientOptions = await useFactory(...args);
      return ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: clientOptions,
      });
    };
  }
}
