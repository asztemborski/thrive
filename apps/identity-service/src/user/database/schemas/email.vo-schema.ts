import { EntitySchema } from '@mikro-orm/core';
import { EmailProperties } from '../../domain/email.value-object';

export const EmailSchema = new EntitySchema<EmailProperties>({
  name: 'EmailSchema',
  embeddable: true,
  properties: {
    address: { type: 'string', unique: true },
    isVerified: { type: 'boolean' },
  },
});
