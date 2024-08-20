import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';

export class PublisherService {
  constructor(
    @Inject('PUBLISHER_SERVICE')
    private readonly clientProxy: ClientProxy,
  ) {}
  async publish(pattern: string, data: any): Promise<void> {
    await firstValueFrom(
      this.clientProxy.emit(pattern, data).pipe(
        catchError((exception: Error) => {
          return throwError(() => new Error(exception.message));
        }),
      ),
    );
  }
}
