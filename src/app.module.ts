import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { ConsumerModule } from './modules/consumer/consumer.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { WeatherModule } from './modules/weather/weather.module';
import { redisStore } from 'cache-manager-redis-yet';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.get('REDIS_HOST'),
            port: +configService.get('REDIS_PORT'),
          },
          password: configService.get('REDIS_PASSWORD'),
          ttl: +configService.get('CACHE_TTL_SEC') * 1000,
        }),
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [
        {
          ttl: 1000,
          limit: +configService.get('RATE_LIMIT_PER_SEC'),
        },
      ],
      inject: [ConfigService],
    }),
    DatabaseModule,
    AuthModule,
    ConsumerModule,
    UserModule,
    WeatherModule,
  ],
})
export class AppModule {}
