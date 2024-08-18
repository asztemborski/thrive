import { Injectable } from '@nestjs/common';

import { User } from '../domain/user.entity';
import { UserSchema } from '../database/user.schema';
import { Email } from '../domain/email.value-object';
import { Username } from '../domain/username.value-object';
import { IUserMapper } from '../contracts/user-mapper.contract';

@Injectable()
export class UserMapper implements IUserMapper {
  toPersistence(entity: User): UserSchema {
    const user = entity.getProperties();
    return {
      ...user,
      emailAddress: user.email.address,
      emailConfirmed: user.email.isConfirmed,
      username: user.username.value,
      passwordHash: user.password,
    };
  }

  toDomain(schema: UserSchema): User {
    return new User({
      ...schema,
      email: new Email({
        address: schema.emailAddress,
        isConfirmed: schema.emailConfirmed,
      }),
      username: new Username({ value: schema.username }),
      password: schema.passwordHash,
    });
  }
}
