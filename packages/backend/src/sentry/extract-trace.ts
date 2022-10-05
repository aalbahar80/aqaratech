import { extractTraceparentData } from '@sentry/tracing';
import { Request } from 'express';

/**
 * Extract the traceparent data from the request headers.
 * Usually for traces originating from the frontend.
 */
export const extractTraceData = (req: Request) => {
	const traceHeader = req.headers['sentry-trace'];

	let traceparentData = undefined;

	if (typeof traceHeader === 'string') {
		traceparentData = extractTraceparentData(traceHeader);
	}

	return traceparentData;
};
