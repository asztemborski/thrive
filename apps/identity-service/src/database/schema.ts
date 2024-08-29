import * as userSchema from '../user/database/user.schema';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

type DatabaseSchema = typeof userSchema;

export type Database = PostgresJsDatabase<DatabaseSchema>;

export const schema = { ...userSchema };
