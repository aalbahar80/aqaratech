import {
	CallHandler,
	ExecutionContext,
	Injectable,
	Logger,
	NestInterceptor,
} from '@nestjs/common';
import { isHealthCheck } from '@self/utils';
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

		// TODO: req.url vs req.baseUrl vs req.originalUrl

		// skip logging health checks
		if (
			isHealthCheck(request.url) &&
			process.env.PUBLIC_AQ_DEBUG_LEVEL !== 'silly'
		) {
			return next.handle();
		}

		this.logRequest(request);

		const now = Date.now();
		return next.handle().pipe(
			tap({
				finalize: () => {
					const response = context.switchToHttp().getResponse<Response>();

					const { statusCode, statusMessage } = response;

					this.logResponse(request, statusCode, statusMessage, now);
				},
			}),
		);
	}

	private logRequest(request: Request) {
		const { ip, method, url } = request;

		const userAgent = request.get('user-agent') || '';

		this.logger.log(`Request: ${method} ${url} ${ip} ${userAgent}`);
	}

	private logResponse(
		request: Request,
		statusCode: number,
		statusMessage: string,
		now: number,
	) {
		const { ip, method, url } = request;

		const responseLog = `Response: ${
			Date.now() - now
		}ms - ${statusCode} ${statusMessage} ${method} ${url} - ${ip}`;

		if (statusCode >= 500) {
			this.logger.error(responseLog);
		} else if (statusCode >= 400) {
			this.logger.warn(responseLog);
		} else {
			this.logger.log(responseLog);
		}
	}
}
