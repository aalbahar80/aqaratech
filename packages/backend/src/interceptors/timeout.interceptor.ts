import {
	CallHandler,
	ExecutionContext,
	Inject,
	Injectable,
	LoggerService,
	NestInterceptor,
	RequestTimeoutException,
} from '@nestjs/common';
import { Request } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
	constructor(
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
	) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const controller = context.getClass().name;
		const handler = context.getHandler().name;
		const url = context.switchToHttp().getRequest<Request>().url;

		return next.handle().pipe(
			timeout(45000),
			catchError((err) => {
				if (err instanceof TimeoutError) {
					const details = {
						level: 'warn',
						message: 'Request timed out',
						handler,
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
