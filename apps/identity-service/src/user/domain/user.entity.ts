import { Email } from './email.value-object';
import { Username } from './username.value-object';
import { EmailAlreadyConfirmedException } from './exceptions';
import { AggregateRoot } from '@packages/nest-ddd';

type UserProperties = {
  email: Email;
  username: Username;
  password: string;
};

export class User extends AggregateRoot {
  private readonly _username: Username;
  private _email: Email;
  private _password: string;

  constructor(properties: UserProperties) {
    super(crypto.randomUUID());
    this._email = properties.email;
    this._username = properties.username;
    this._password = properties.password;
  }

  verifyEmailAddress(): void {
    if (this.email.isVerified) {
      throw new EmailAlreadyConfirmedException();
    }

    this._email = new Email({
      address: this.email.address,
      isVerified: true,
    });
  }

  changePassword(newPassword: string): void {
    this._password = newPassword;
  }

  get email(): Email {
    return this._email;
  }

  get username(): Username {
    return this._username;
  }

  get password(): string {
    return this._password;
  }
}
