import { dev } from '$app/env';
import pino from 'pino';
// import { logflarePinoVercel } from 'pino-logflare';

// https://github.com/Logflare/pino-logflare/blob/master/docs/VERCEL.md
// const { stream, send } = logflarePinoVercel({
// 	apiKey: import.meta.env.VITE_PINO_API_KEY,
// 	sourceToken: import.meta.env.VITE_PINO_SOURCE_TOKEN,
// });

export const logger = pino(
	{
		browser: { asObject: true },
		// browser: {
		// 	transmit: {
		// 		level: 'info',
		// 		send: send,
		// 	},
		// },
		level: 'debug',
		// base: {
		// 	env: process.env.VERCEL_ENV,
		// 	revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
		// },
		transport: dev
			? {
					target: 'pino-pretty',
					options: {
						ignore: 'pid,hostname',
						translateTime: true,
					},
			  }
			: undefined,
	},
	// stream,
);
