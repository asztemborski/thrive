import { Injectable } from "@nestjs/common";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DatabaseSchema, DrizzleConfig } from "./drizzle.module.options";

export interface IDatabaseService {
  getClient(config: DrizzleConfig): PostgresJsDatabase<DatabaseSchema>;
}

@Injectable()
export class DrizzleService implements IDatabaseService {
  getClient(config: DrizzleConfig): PostgresJsDatabase<DatabaseSchema> {
    const queryClient = postgres(
      config.connectionUrl ?? "",
      config.connectionConfig,
    );
    return drizzle(queryClient, config.options);
  }
}
