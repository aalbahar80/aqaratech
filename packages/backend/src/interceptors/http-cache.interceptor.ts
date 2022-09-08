import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    // track cache by authorization header
    const request = context.switchToHttp().getRequest<Request>();

    const pathname = request.path;

    const authHeader = request.headers.authorization;

    const key = `${pathname}:${authHeader}`;

    return key;
  }
}
