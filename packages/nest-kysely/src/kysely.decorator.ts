import { Inject } from "@nestjs/common";

export const KYSELY_CLIENT = Symbol("__KYSELY_CLIENT__");

export const InjectKysely = () => Inject(KYSELY_CLIENT);
