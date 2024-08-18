import { Email } from './email.value-object';
import { Username } from './username.value-object';
import { EmailAlreadyConfirmedException } from './exceptions';
import { AggregateRoot } from '@packages/nest-ddd';

type UserProperties = {
  email: Email;
  username: Username;
  password: string;
};

type CreateUserProperties = {
  email: string;
  username: string;
  password: string;
};

export class User extends AggregateRoot<UserProperties> {
  static create({ email, username, password }: CreateUserProperties): User {
    const userEmail = new Email({ address: email, isConfirmed: false });
    const validatedUsername = new Username({ value: username });

    return new User({
      email: userEmail,
      username: validatedUsername,
      password,
    });
  }

  confirmEmailAddress(): void {
    if (this.email.isConfirmed) {
      throw new EmailAlreadyConfirmedException();
    }

    this.properties.email = new Email({
      address: this.email.address,
      isConfirmed: true,
    });
  }

  changePassword(newPassword: string): void {
    this.properties.password = newPassword;
  }

  get email(): Email {
    return this.properties.email;
  }

  get username(): string {
    return this.properties.username.value;
  }

  get password(): string {
    return this.properties.password;
  }
}
