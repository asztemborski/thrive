import { UserEntitySchema } from './user.entity-schema';
import { EmailSchema } from './email.vo-schema';

export * from './user.entity-schema';

export const databaseSchemas = [UserEntitySchema, EmailSchema];
