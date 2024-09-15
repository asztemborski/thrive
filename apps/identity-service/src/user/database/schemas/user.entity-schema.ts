import { Entity, EntitySchema, Property } from '@mikro-orm/core';
import { User } from '../../domain/user.entity';
import { Email } from '../../domain/email.value-object';
import { UsernameSchemaType } from '../schema-types';

export type UserEntitySchemaProperties = Omit<User, 'domainEvents'>;

export const UserEntitySchema = new EntitySchema<UserEntitySchemaProperties>({
  class: User,
  properties: {
    id: { type: 'uuid', primary: true },
    username: { type: new UsernameSchemaType() },
    email: {
      kind: 'embedded',
      entity: 'EmailSchema',
      onCreate: (user) => new Email({ ...user.email.unpack() }),
    },
    password: { type: 'varchar', hidden: true },
  },
  schema: 'identity',
});
