import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RmqOptions, Transport } from '@nestjs/microservices';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`],
      queue: 'weather_queue',
      prefetchCount: 1,
      persistent: true,
      noAck: false,
      queueOptions: {
        durable: true,
      },
      socketOptions: {
        heartbeatIntervalInSeconds: 60,
        reconnectTimeInSeconds: 5,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(+process.env.SERVER_PORT);
}
bootstrap();
