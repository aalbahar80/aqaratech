import {
	CallHandler,
	ExecutionContext,
	Inject,
	Injectable,
	LoggerService,
	NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { isHealthCheck } from '@self/utils';

/**
 * An interceptor that logs the response body. Useful for debugging.
 */
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	constructor(
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
	) {}

	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<Response> | Promise<Observable<Response>> {
		// Skip health checks

		const pathname = context.switchToHttp().getRequest<Request>().path;

		if (isHealthCheck(pathname)) {
			return next.handle();
		}

		return next.handle().pipe(
			tap((data) => {
				this.logger.debug?.(data, ResponseInterceptor.name);
			}),
		);
	}
}
