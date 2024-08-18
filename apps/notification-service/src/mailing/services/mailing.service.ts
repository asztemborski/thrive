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
        path.join('apps', 'notifications', 'src', 'mail', 'templates'),
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

    await transporter.sendMail({
      from: `${this.mailingConfig.displayName} <${this.mailingConfig.mail}>`,
      to: receiver,
      subject: mail.subject,
      text: textContent,
      html: htmlContent,
    });
  }

  async sendVerification(receiver: string, confirmUrl: string, username: string): Promise<void> {
    this.logger.log(`Sending verification email to ${receiver}`);

    try {
      await this.sendMail(receiver, {
        subject: 'Thrive | Mail verification',
        templateDirectory: 'email-verification',
        templateContext: { confirmUrl, username },
      });
    } catch (error) {
      this.logger.error(`Error while sending verification email to user: ${receiver}`);

      throw error;
    }

    this.logger.log('Verification email sent successfully');
  }

  async sendPasswordReset(receiver: string, url: string, username: string): Promise<void> {
    this.logger.log(`Sending password reset email to ${receiver}`);

    try {
      await this.sendMail(receiver, {
        subject: 'Thrive | Password reset',
        templateDirectory: 'password-reset',
        templateContext: { url, username },
      });
    } catch (error) {
      this.logger.error(`Error while sending password reset email to user: ${receiver}`);

      throw error;
    }

    this.logger.log('Password reset email sent successfully');
  }
}
