import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendRequestLimitExceeded(
    to: string,
    userId: string,
    userLimit: number,
  ) {
    await this.mailerService.sendMail({
      to,
      subject: 'User limit exceeded',
      template: './limit-exceeded',
      context: { userId, userLimit },
    });
  }
}
