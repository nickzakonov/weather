import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RateLimitThrottleGuard } from '../../throttle.guard';
import { LimitGuard } from '../../limit.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}
  @UseGuards(JwtAuthGuard, RateLimitThrottleGuard, LimitGuard)
  @UseInterceptors(CacheInterceptor)
  @Get(':city/:date')
  public async getWeather(
    @Param('city') city: string,
    @Param('date') date: string,
  ) {
    return await this.weatherService.find(city, date);
  }
}
