import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { HttpLoggerService } from 'src/http-logger/HttpLogger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
	constructor(private readonly httpLogger: HttpLoggerService) {}

	use(request: Request, response: Response, next: NextFunction) {
		const url = new URL(
			request.originalUrl,
			`${request.protocol}://${request.get('host') ?? ''}`,
		);

		this.httpLogger.logRequest(request, url);

		const start = Date.now();

		response.on('finish', () => {
			const { statusCode } = response;

			this.httpLogger.logResponse({ request, url, statusCode, start });
		});

		next();
	}
}
