import {
  AmqpConnectionManagerSocketOptions,
  AmqplibQueueOptions,
  RmqUrl,
} from "@nestjs/microservices/external/rmq-url.interface";
import { Serializer } from "@nestjs/microservices/interfaces/serializer.interface";
import { Deserializer } from "@nestjs/microservices/interfaces/deserializer.interface";
import {
  ConfigurableModuleBuilder,
  ModuleMetadata,
  Provider,
  Type,
} from "@nestjs/common";
import { ClientsModuleOptionsFactory } from "@nestjs/microservices";

export type RabbitmqOptions = {
  name?: string;
  urls?: string[] | RmqUrl[];
  queue?: string;
  prefetchCount?: number;
  isGlobalPrefetchCount?: boolean;
  queueOptions?: AmqplibQueueOptions;
  socketOptions?: AmqpConnectionManagerSocketOptions;
  noAck?: boolean;
  consumerTag?: string;
  serializer?: Serializer;
  deserializer?: Deserializer;
  replyQueue?: string;
  persistent?: boolean;
  headers?: Record<string, string>;
  noAssert?: boolean;
  maxConnectionAttempts?: number;
};

export interface ClientsProviderAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  useExisting?: Type<ClientsModuleOptionsFactory>;
  useClass?: Type<ClientsModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<RabbitmqOptions> | RabbitmqOptions;
  inject?: any[];
  extraProviders?: Provider[];
  name?: string;
}

export type ClientsModuleAsyncOptions = ClientsProviderAsyncOptions[];

export const {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
  MODULE_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<RabbitmqOptions>().build();
