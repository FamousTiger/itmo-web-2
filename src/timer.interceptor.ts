import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TimerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{ time: string }> | Promise<Observable<{ time: string }>> {
    const startTime = Date.now();
    return next
      .handle()
      .pipe(map(() => ({ time: `+ ${Date.now() - startTime} ms (сервер)` })));
  }
}
