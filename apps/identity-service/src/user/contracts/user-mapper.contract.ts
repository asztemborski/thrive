import { Mapper } from '@packages/nest-ddd';

import { User } from '../domain/user.entity';
import { UserSchema } from '../database';

export const IUserMapper = Symbol('__IDENTITY_USER_MAPPER__');

export interface IUserMapper extends Mapper<User, UserSchema> {}
