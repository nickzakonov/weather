import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { MailService } from '../notification/mail.service';

@Controller()
export class ConsumerController {
  constructor(private mailService: MailService) {}
  @EventPattern('REQUEST_LIMIT_EXCEEDED')
  async handleExceededRequestLimit(
    @Payload() payload: { userId: string; userLimit: number },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.mailService.sendRequestLimitExceeded(
        'nick.zakonov@gmail.com',
        payload.userId,
        payload.userLimit,
      );
      channel.ack(originalMsg);
    } catch (error) {
      console.log(error);
    }
  }
}
