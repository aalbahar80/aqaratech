import {
	CallHandler,
	ExecutionContext,
	HttpException,
	Inject,
	Injectable,
	LoggerService,
	NestInterceptor,
} from '@nestjs/common';
import { formatRequestLog, isHealthCheck } from '@self/utils';
import { Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	constructor(
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
	) {}

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
				// `complete` is not called when an error is thrown, see `finalize` instead
				complete: () => {
					const response = context.switchToHttp().getResponse<Response>();

					const { statusCode } = response;

					this.logResponse({ request, statusCode, now });
				},

				error: (err) => {
					this.logger.debug!({ err });
					if (err instanceof HttpException) {
						let statusMessage: string | undefined;

						try {
							statusMessage = (err.getResponse() as Record<string, any>)[
								'message'
							] as string;
						} catch (e) {
							this.logger.error('Unable to get error status message', e);
						}

						this.logResponse({
							request,
							statusCode: err.getStatus(),
							statusMessage,
							now,
						});
					} else {
						// TODO: monitor
						this.logResponse({
							request,
							statusCode: 500,
							statusMessage: 'Internal Server Error',
							now,
						});

						this.logger.error('err is not instance of HttpException', err);
					}
				},
			}),
		);
	}

	private logRequest(request: Request) {
		const url = new URL(
			request.originalUrl,
			`${request.protocol}://${request.get('host')}`,
		);

		const log = formatRequestLog({
			request,
			url: new URL(url),
			extra: {
				ip: request.ip,
				userAgent: request.get('user-agent') ?? '',
			},
		});

		this.logger.log(log);
	}

	private logResponse({
		request,
		statusCode,
		statusMessage,
		now,
	}: {
		request: Request;
		statusCode: number;
		statusMessage?: string;
		now: number;
	}) {
		// TODO: fix ip
		const { method, url } = request;

		const responseLog = `Response: ${
			Date.now() - now
		}ms - ${method} ${url} - ${statusCode} ${statusMessage || ''}`;

		if (statusCode >= 500) {
			this.logger.error(responseLog);
		} else if (statusCode >= 400) {
			this.logger.warn(responseLog);
		} else {
			this.logger.log(responseLog);
		}
	}
}
