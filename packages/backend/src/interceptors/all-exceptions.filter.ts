import { ArgumentsHost, Catch } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { BaseExceptionFilter } from '@nestjs/core';
import { InjectSentry, SentryService } from '@travelerdev/nestjs-sentry';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
	constructor(@InjectSentry() private readonly sentry: SentryService) {
		super();
	}

	override catch(exception: unknown, host: ArgumentsHost) {
		// TODO: review order
		this.captureExceptionManually(host.switchToHttp(), exception);
		// eslint-disable-next-line promise/valid-params
		super.catch(exception, host);
	}

	captureExceptionManually(http: HttpArgumentsHost, exception: unknown): void {
		this.sentry.instance().withScope((scope) => {
			// add request data in beforeSend?
			// scope.addEventProcessor((event) => {
			// 	return addRequestDataToEvent(event, http.getRequest());
			// });
			scope.setTag('Manual', 'true');

			this.sentry.instance().captureException(exception);
		});
	}
}
