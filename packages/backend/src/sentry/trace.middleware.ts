import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { NextFunction, Request, Response } from 'express';

import { extractTraceData } from 'src/sentry/extract-trace';
import { getUserSentry } from 'src/sentry/get-user-sentry';

@Injectable()
export class TraceMiddleware implements NestMiddleware {
	constructor(@InjectSentry() private readonly sentry: SentryService) {}
	use(req: Request, res: Response, next: NextFunction): void {
		// TODO: How to use this.sentry.instance().extractRequestData(req) do?;
		// More info: https://develop.sentry.dev/sdk/event-payloads/request/
		const transaction = this.sentry.instance().startTransaction({
			// op conventions: https://develop.sentry.dev/sdk/performance/span-operations/
			op: 'http.server',
			name: req.baseUrl,
			// Consider replacing with `continueFromHeaders` once it is implemented
			// More info: https://develop.sentry.dev/sdk/performance/#new-span-and-transaction-classes
			...extractTraceData(req),
		});

		this.sentry.instance().configureScope((scope) => {
			scope.setSpan(transaction);
		});

		req.on('close', () => {
			// Add user later, after the request is authenticated
			this.sentry.instance().configureScope((scope) => {
				scope.setUser(getUserSentry(req));
			});

			// Finish the transaction and send it to Sentry
			transaction.setHttpStatus(res.statusCode);
			transaction.finish();
		});

		next();
	}
}
