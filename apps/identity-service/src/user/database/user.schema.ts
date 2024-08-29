import { boolean, pgSchema, uuid, varchar } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';

const schema = pgSchema('identity');

export const users = schema.table('user', {
  id: uuid('id').defaultRandom().primaryKey(),
  emailAddress: varchar('email_address').notNull().unique(),
  emailConfirmed: boolean('email_confirmed').notNull(),
  username: varchar('username').notNull().unique(),
  password: varchar('password_hash').notNull(),
});

export type UserSchema = InferSelectModel<typeof users>;
