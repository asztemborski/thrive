import { User } from '../domain/user.entity';

export const IUserRepository = Symbol('__IDENTITY_USER_REPOSITORY__');

export interface IUserRepository {
  getById(id: string): Promise<User | undefined>;
  getByEmail(email: string): Promise<User | undefined>;
  insert(user: User): Promise<void>;
  isUnique(
    email: string,
    username: string,
  ): Promise<[emailUnique: boolean, usernameUnique: boolean]>;
  update(user: User): Promise<void>;
}
