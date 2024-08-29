import { Inject } from "@nestjs/common";

export const DRIZZLE_CLIENT = Symbol("__DRIZZLE_CLIENT__");

export const InjectDrizzle = () => Inject(DRIZZLE_CLIENT);
