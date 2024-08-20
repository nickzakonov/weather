import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/User';
import { Weather } from '../../entities/Weather';
import { users } from './seeds/users';
import { weather } from './seeds/weather';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Weather) private weatherRepository: Repository<Weather>,
  ) {}

  public async seed(): Promise<void> {
    await this.userRepository.save(users);
    await this.weatherRepository.save(weather);
  }
}
