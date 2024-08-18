import { Inject, Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';
import { InjectKysely } from '@packages/nest-kysely';

import { IUserMapper, IUserRepository } from '../contracts';
import { User } from '../domain/user.entity';
import { Database } from '../../database/schema';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectKysely() private readonly db: Kysely<Database>,
    @Inject(IUserMapper) private readonly userMapper: IUserMapper,
  ) {}

  async getById(id: string): Promise<User | undefined> {
    const user = await this.db
      .selectFrom('identity.user')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    return user && this.userMapper.toDomain(user);
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const user = await this.db
      .selectFrom('identity.user')
      .selectAll()
      .where('emailAddress', '=', email)
      .executeTakeFirst();

    return user && this.userMapper.toDomain(user);
  }

  async insert(user: User): Promise<void> {
    const schema = this.userMapper.toPersistence(user);
    await this.db.insertInto('identity.user').values(schema).execute();
  }

  async isUnique(
    email: string,
    username: string,
  ): Promise<[emailUnique: boolean, usernameUnique: boolean]> {
    const user = await this.db
      .selectFrom('identity.user')
      .select(['emailAddress', 'username'])
      .where((eb) => eb.or([eb('emailAddress', '=', email), eb('username', '=', username)]))
      .executeTakeFirst();

    return user ? [user.emailAddress !== email, user.username !== username] : [true, true];
  }

  async update(user: User): Promise<void> {
    const userSchema = this.userMapper.toPersistence(user);
    await this.db.updateTable('identity.user').set(userSchema).where('id', '=', user.id).execute();
  }
}
