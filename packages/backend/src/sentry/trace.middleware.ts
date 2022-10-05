import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { NextFunction, Request, Response } from 'express';
import { extractTraceData } from 'src/sentry/extract-trace';
import { getUserSentry } from 'src/sentry/get-user-sentry';

@Injectable()
export class TraceMiddleware implements NestMiddleware {
	constructor(@InjectSentry() private readonly sentry: SentryService) {}
	use(req: Request, res: Response, next: NextFunction): void {
		const transaction = this.sentry.instance().startTransaction({
			op: 'request',
			name: req.baseUrl,
			...extractTraceData(req),
		});

		this.sentry
			.instance()
			.getCurrentHub()
			.configureScope((scope) => {
				scope.addEventProcessor((event) => {
					event.request = {
						method: req.method,
						url: req.url,
					};
					return event;
				});
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
