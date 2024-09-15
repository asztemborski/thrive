import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../contracts';
import { User } from '../domain/user.entity';
import { EntityManager } from '@mikro-orm/core';
import { UserEntitySchema } from './schemas';
import { Username } from '../domain/username.value-object';
import { Email } from '../domain/email.value-object';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async getById(id: string): Promise<User | undefined> {
    const user = await this.entityManager.findOne(User, {
      id: id,
    });

    return user ?? undefined;
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const user = await this.entityManager.findOne(User, {
      email: { address: email },
    });

    return user ?? undefined;
  }

  async insert(user: User): Promise<void> {
    this.entityManager.persist(user);
    await this.entityManager.flush();
  }

  async isUnique(
    email: string,
    username: string,
  ): Promise<[emailUnique: boolean, usernameUnique: boolean]> {
    const user = await this.entityManager.findOne(
      User,
      {
        $or: [{ email: { address: email } }, { username: new Username({ value: username }) }],
      },
      { fields: ['email', 'username'] },
    );

    if (!user) return [true, true];

    return [user.email.address !== email, user.username.value !== username];
  }

  async update(user: User): Promise<void> {
    this.entityManager.persist(user);
    await this.entityManager.flush();
  }
}
