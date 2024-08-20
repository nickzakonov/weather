import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { PublisherModule } from '../publisher/publisher.module';
import { WeatherService } from './weather.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weather } from '../../entities/Weather';

@Module({
  imports: [TypeOrmModule.forFeature([Weather]), PublisherModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
