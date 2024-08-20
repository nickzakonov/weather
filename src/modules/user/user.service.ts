import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/User';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { RedisCache } from 'cache-manager-redis-yet';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: RedisCache,
    @Inject(ConfigService) private configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  public async findUserByLoginAndPassword(email: string, password: string) {
    if (!email || !password) return;

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) return;

    if (bcrypt.compareSync(password, user.password)) {
      return { ...user, password: undefined };
    }
  }

  public async getUserLimit(id: string) {
    const user = await this.findById(id);
    const key = 'total_request_count_' + user.id;
    const requestCount = await this.cacheManager.get(key);
    return {
      requestLimit: +this.configService.get<number>('REQUEST_LIMIT'),
      requestCount: requestCount ?? 0,
    };
  }
}
