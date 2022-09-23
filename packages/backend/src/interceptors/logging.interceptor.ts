import {
	CallHandler,
	ExecutionContext,
	Injectable,
	Logger,
	NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	private readonly logger = new Logger(LoggingInterceptor.name);

	intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> | Promise<Observable<any>> {
		const request = context.switchToHttp().getRequest() as Request;
		const { ip, method, url } = request;
		const userAgent = request.get('user-agent') || '';
		this.logger.log(
			`Request: ${method} ${url} ${ip}: ${context.getClass().name} ${
				context.getHandler().name
			}`,
		);

		const now = Date.now();
		return next.handle().pipe(
			tap(
				() => {
					const response = context.switchToHttp().getResponse() as Response;
					const { statusCode } = response;
					// const contentLength = response.get('content-length');
					this.logger.log(
						`Response: ${
							Date.now() - now
						}ms - ${statusCode} ${method} ${url} - ${userAgent} ${ip}`,
					);
					// this.logger.debug('Response:', res);
				},
				(err) => {
					this.logger.warn(err);
				},
			),
		);
	}
}
