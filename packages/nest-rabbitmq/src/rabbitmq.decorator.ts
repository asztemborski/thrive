import { Inject } from "@nestjs/common";

export const RABBITMQ_CLIENT = (client?: string) =>
  `__RABBITMQ_CLIENT_${client ? client + "__" : "_"}`;

export const InjectRabbitmq = (client?: string) =>
  Inject(RABBITMQ_CLIENT(client));
