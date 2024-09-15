import { ValueObject } from '@packages/nest-ddd';
import { isEmpty } from '@packages/nest-utilities';
import { EmptyEmailAddressException, InvalidEmailAddressException } from './exceptions';

export type EmailProperties = {
  address: string;
  isVerified: boolean;
};

const MAIL_REGEX = /^[\w-.]+@?([\w-]+\.)+[\w-]{2,4}$/;

export class Email extends ValueObject<EmailProperties> {
  protected validate({ address }: EmailProperties): void {
    if (isEmpty(address.trim())) {
      throw new EmptyEmailAddressException();
    }

    if (!MAIL_REGEX.test(address.trim())) {
      throw new InvalidEmailAddressException();
    }
  }

  get address(): string {
    return this.props.address;
  }

  get isVerified(): boolean {
    return this.props.isVerified;
  }
}
