import {
	CallHandler,
	ExecutionContext,
	Inject,
	Injectable,
	LoggerService,
	NestInterceptor,
	RequestTimeoutException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

import { CUSTOM_TIMEOUT } from 'src/decorators/custom-timeout.decorator';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
	constructor(
		private readonly reflector: Reflector,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
	) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const controller = context.getClass().name;
		const handler = context.getHandler();
		const url = context.switchToHttp().getRequest<Request>().url;

		const customTimeout = this.reflector.get<number>(CUSTOM_TIMEOUT, handler);
		const TIMEOUT = customTimeout || 5000;

		return next.handle().pipe(
			timeout(TIMEOUT),
			catchError((err: unknown) => {
				if (err instanceof TimeoutError) {
					const details = {
						level: 'warn',
						message: 'Request timed out',
						handler: handler.name,
						controller,
						url,
					};

					this.logger.warn(details, TimeoutInterceptor.name);

					return throwError(() => new RequestTimeoutException());
				}
				return throwError(() => err);
			}),
		);
	}
}
