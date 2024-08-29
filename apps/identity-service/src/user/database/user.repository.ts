import { Inject, Injectable } from '@nestjs/common';

import { IUserMapper, IUserRepository } from '../contracts';

import { InjectDrizzle } from '@packages/nest-drizzle';
import { Database } from '../../database/schema';
import { eq, or } from 'drizzle-orm';
import { User } from '../domain/user.entity';
import { users } from './user.schema';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectDrizzle() private readonly database: Database,
    @Inject(IUserMapper) private readonly userMapper: IUserMapper,
  ) {}

  async getById(id: string): Promise<User | undefined> {
    const user = await this.database.query.users.findFirst({
      where: (user) => eq(user.id, id),
    });

    return user && this.userMapper.toDomain(user);
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const user = await this.database.query.users.findFirst({
      where: (user) => eq(user.emailAddress, email),
    });

    return user && this.userMapper.toDomain(user);
  }

  async insert(user: User): Promise<void> {
    const accountSchema = this.userMapper.toPersistence(user);
    await this.database.insert(users).values(accountSchema);
  }

  async isUnique(
    email: string,
    username: string,
  ): Promise<[emailUnique: boolean, usernameUnique: boolean]> {
    const user = await this.database.query.users.findFirst({
      where: (user) => or(eq(user.emailAddress, email), eq(user.username, username)),
    });

    return user ? [user.emailAddress !== email, user.username !== username] : [true, true];
  }

  async update(user: User): Promise<void> {
    await this.database
      .update(users)
      .set(this.userMapper.toPersistence(user))
      .where(eq(users.id, user.id));
  }
}
