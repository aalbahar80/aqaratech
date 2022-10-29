import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { formatRequestLog } from '@self/utils';
import { Request } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

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
}
