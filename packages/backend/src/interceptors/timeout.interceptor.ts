import {
	CallHandler,
	ExecutionContext,
	Injectable,
	Logger,
	NestInterceptor,
	RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
	private readonly logger = new Logger(TimeoutInterceptor.name);

	intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			timeout(5000),
			catchError((err) => {
				if (err instanceof TimeoutError) {
					this.logger.warn('Request timed out');
					return throwError(() => new RequestTimeoutException());
				}
				return throwError(() => err);
			}),
		);
	}
}
