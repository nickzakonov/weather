import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from '../../entities/User';
import { Weather } from '../../entities/Weather';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: 'default',
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        namingStrategy: new SnakeNamingStrategy(),
        database: configService.get<string>('DATABASE_NAME'),
        host: configService.get<string>('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        entities: [User, Weather],
        installExtensions: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
