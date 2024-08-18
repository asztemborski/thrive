import { MailDto } from '../dtos';

export const IMailingService = Symbol('__NOTIFICATIONS_MAIL_SERVICE__');

export interface IMailingService {
  sendVerification(receiver: string, confirmUrl: string, username: string): Promise<void>;
  sendMail(receiver: string | string[], mail: MailDto): Promise<void>;
  sendPasswordReset(receiver: string, confirmUrl: string, username: string): Promise<void>;
}
