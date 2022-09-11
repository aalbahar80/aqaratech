import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { extractTraceparentData } from '@sentry/tracing';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { processException } from 'src/sentry/reporting';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();

    // Extract the traceparent data from the request headers
    const traceHeader = req.headers['sentry-trace'];
    let traceparentData = undefined;
    if (typeof traceHeader === 'string') {
      traceparentData = extractTraceparentData(traceHeader);
    }

    const transaction = Sentry.startTransaction({
      op: 'nestjs.http',
      name: `${context.switchToHttp().getRequest<Request>().method} ${
        context.switchToHttp().getRequest<Request>().path
      }`,
      ...traceparentData,
    });

    return next.handle().pipe(
      tap({
        error: (exception) => {
          // Skip HttpExceptions with status code < 500.
          // if (
          //   exception instanceof HttpException ||
          //   exception.constructor.name === 'HttpException'
          // ) {
          // if ((exception as HttpException).getStatus() < 500) {
          //   return;
          // }
          // }
          processException(context, exception);
        },
      }),
      finalize(() => {
        transaction.finish();
      }),
    );
  }
}
