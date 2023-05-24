import { Injectable, NestMiddleware } from '@nestjs/common';
import {
	extractTraceparentData,
	extractRequestData,
	PolymorphicRequest,
} from '@sentry/node';
import { extractPathForTransaction } from '@sentry/utils';
import { InjectSentry, SentryService } from '@travelerdev/nestjs-sentry';
import { NextFunction, Request, Response } from 'express';
import { isString } from 'remeda';

import { getUserSentry } from 'src/sentry/get-user-sentry';

@Injectable()
export class TraceMiddleware implements NestMiddleware {
	constructor(@InjectSentry() private readonly sentry: SentryService) {}
	use(req: Request, res: Response, next: NextFunction): void {
		// TODO: How to use this.sentry.instance().extractRequestData(req)?
		// More info: https://develop.sentry.dev/sdk/event-payloads/request/
		// route only available in interceptors (e.g. /users/2/posts/55 -> /users/:id/posts/:id)
		const [name, source] = extractPathForTransaction(
			req as PolymorphicRequest,
			{
				path: true,
				method: true,
			},
		);

		// If there is a trace header set, we extract the data from it (parentSpanId, traceId, and sampling decision)
		const traceparentData =
			req.headers &&
			isString(req.headers['sentry-trace']) &&
			extractTraceparentData(req.headers['sentry-trace']);

		const transaction = this.sentry.instance().startTransaction(
			{
				name,
				// op conventions: https://develop.sentry.dev/sdk/performance/span-operations/
				op: 'http.server',
				// Consider replacing with `continueFromHeaders` once it is implemented
				// More info: https://develop.sentry.dev/sdk/performance/#new-span-and-transaction-classes
				...traceparentData,
				metadata: {
					request: req as PolymorphicRequest,
					source,
				},
			},
			// extra context passed to the tracesSampler
			{ request: extractRequestData(req as PolymorphicRequest) },
		);

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
