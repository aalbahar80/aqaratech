import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { beforeAll, afterAll, afterEach } from 'vitest';

import { MESSAGES_RES_MOCK } from './util/messages';

export const restHandlers = [
	rest.get('https://api.novu.co/v1/messages', (_req, res, ctx) => {
		console.log('[ MOCK ] - api.novu.co/v1/messages');
		return res(ctx.status(200), ctx.json(MESSAGES_RES_MOCK));
	}),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers()); // Reset handlers after each test `important for test isolation`
