import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Eta } from 'eta';
import * as process from 'node:process';
import * as path from 'node:path';

import { IMailingService } from '../contracts/mailing-service.contract';
import { MailingConfig } from '../config/mailing.config';
import { MailDto } from '../dtos';

@Injectable()
export class MailingService implements IMailingService {
  private readonly logger = new Logger(MailingService.name);

  constructor(private readonly mailingConfig: MailingConfig) {}

  async sendMail(receiver: string | string[], mail: MailDto): Promise<void> {
    const transporter = nodemailer.createTransport({ ...this.mailingConfig });

    const eta = new Eta({
      views: path.resolve(
        process.cwd(),
        path.join('apps', 'notification-service', 'src', 'mailing', 'templates'),
      ),
    });

    const textContent = await eta.renderAsync(
      path.join(mail.templateDirectory, 'text'),
      mail.templateContext,
    );
    const htmlContent = await eta.renderAsync(
      path.join(mail.templateDirectory, 'html'),
      mail.templateContext,
    );

    try {
      await transporter.sendMail({
        from: `${this.mailingConfig.displayName} <${this.mailingConfig.mail}>`,
        to: receiver,
        subject: mail.subject,
        text: textContent,
        html: htmlContent,
      });
    } catch (error) {
      mail.onError && mail.onError(error);
      throw error;
    }

    mail.onSuccess && mail.onSuccess();
  }

  async sendVerification(receiver: string, confirmUrl: string, username: string): Promise<void> {
    this.logger.log(`Sending verification email to ${receiver}`);

    await this.sendMail(receiver, {
      subject: 'Thrive | Mail verification',
      templateDirectory: 'email-verification',
      templateContext: { confirmUrl, username },
      onSuccess: () => this.logger.log('Verification email sent successfully'),
      onError: () =>
        this.logger.error(`Error while sending verification email to user: ${receiver}`),
    });
  }

  async sendPasswordReset(receiver: string, url: string, username: string): Promise<void> {
    this.logger.log(`Sending password reset email to ${receiver}`);

    await this.sendMail(receiver, {
      subject: 'Thrive | Password reset',
      templateDirectory: 'password-reset',
      templateContext: { url, username },
      onSuccess: () => this.logger.log('Password reset email sent successfully'),
      onError: () =>
        this.logger.error(`Error while sending password reset email to user: ${receiver}`),
    });
  }
}
