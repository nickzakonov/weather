import { Module } from '@nestjs/common';
import { ConsumerController } from './consumer.controller';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [NotificationModule],
  controllers: [ConsumerController],
})
export class ConsumerModule {}
