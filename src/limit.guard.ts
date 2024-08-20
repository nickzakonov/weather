import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { RedisCache } from 'cache-manager-redis-yet';
import { PublisherService } from './modules/publisher/publisher.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LimitGuard implements CanActivate {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: RedisCache,
    @Inject(ConfigService) private configService: ConfigService,
    @Inject(PublisherService) private publisherService: PublisherService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const key = 'total_request_count_' + request.user.id;
    const requestCount = await this.cacheManager.get(key);

    if (requestCount > +this.configService.get<number>('REQUEST_LIMIT')) {
      await this.publisherService.publish('REQUEST_LIMIT_EXCEEDED', {
        userId: request.user.id,
        userLimit: requestCount,
      });
      return false;
    }
    await this.cacheManager.store.client.incr(key);
    return true;
  }
}
