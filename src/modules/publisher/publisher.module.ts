import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PublisherService } from './publisher.service';

@Module({
  providers: [
    {
      provide: 'PUBLISHER_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${configService.get('RABBIT_HOST')}:${configService.get(
                'RABBIT_PORT',
              )}`,
            ],
            queue: 'weather_queue',
            prefetchCount: 1,
            persistent: true,
            noAck: true,
            queueOptions: {
              durable: true,
            },
            socketOptions: {
              heartbeatIntervalInSeconds: 60,
              reconnectTimeInSeconds: 5,
            },
          },
        });
      },
      inject: [ConfigService],
    },
    PublisherService,
  ],
  exports: [PublisherService],
})
export class PublisherModule {}
