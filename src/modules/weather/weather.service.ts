import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weather } from '../../entities/Weather';
import { isDateValid } from '../../utils/validators';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(Weather) private weatherRepository: Repository<Weather>,
  ) {}

  public async find(city: string, date: string): Promise<Weather> {
    if (!city)
      throw new HttpException('Invalid city provided', HttpStatus.BAD_REQUEST);

    if (!isDateValid(date))
      throw new HttpException('Invalid date provided', HttpStatus.BAD_REQUEST);

    const weather = await this.weatherRepository.findOne({
      where: { city, date },
    });

    if (!weather) {
      throw new HttpException('No weather records found', HttpStatus.NOT_FOUND);
    }

    return weather;
  }
}
