import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Request } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { formatRequestLog, formatResponseLog } from '@self/utils';

@Injectable()
export class HttpLoggerService {
	constructor(
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
	) {}

	logRequest(request: Request, url: URL) {
		const log = formatRequestLog({
			request,
			url,
			extra: {
				ip: request.ip,
				userAgent: request.get('user-agent') ?? '',
			},
		});

		this.logger.log(log, 'Request');
	}

	logResponse({
		request,
		statusCode,
		statusMessage,
		start,
		url,
	}: {
		request: Request;
		statusCode: number;
		statusMessage?: string;
		start: number;
		url: URL;
	}) {
		const text = formatResponseLog({
			response: { status: statusCode },
			method: request.method,
			url,
			start,
			extra: {
				ip: request.ip,
				userAgent: request.get('user-agent') ?? '',
				statusMessage,
			},
		});

		if (statusCode >= 500) {
			this.logger.error(
				{
					...text,
					level: 'error',
				},
				'Response',
			);
		} else if (statusCode >= 400) {
			this.logger.warn(
				{
					...text,
					level: 'warn',
				},
				'Response',
			);
		} else {
			this.logger.log(text, 'Response');
		}
	}
}
