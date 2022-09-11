import { ExecutionContext } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Request } from 'express';

export interface ExtraContext {
  name: string;
  fieldData: Record<string, string>;
}

/**
 * Report an exception with request and additional optional context objects.
 *
 * @param exception
 * @param request A request object if available.
 */
export function reportRequestException(
  exception: Error & { reported?: boolean; status?: number; response?: any },
  request?: Request,
) {
  // Don't report already reported exceptions
  if (exception.reported) {
    return;
  }
  Sentry.withScope((scope: Sentry.Scope) => {
    scope.addEventProcessor((event: Sentry.Event) => {
      if (request) {
        const sentryEvent = Sentry.addRequestDataToEvent(event, request);
        sentryEvent.level = 'error';
        return sentryEvent;
      }
      return null;
    });
    Sentry.captureException(exception);
    exception.reported = true;
  });
}

export function processException(context: ExecutionContext, exception: Error) {
  const request = context.switchToHttp().getRequest();

  reportRequestException(exception, request);
}
