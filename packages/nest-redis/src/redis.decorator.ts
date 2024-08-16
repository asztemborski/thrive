import { Inject } from "@nestjs/common";

export const REDIS_CLIENT = Symbol("__REDIS_CLIENT__");

export const InjectRedis = () => Inject(REDIS_CLIENT);
