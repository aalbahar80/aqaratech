import { beforeEach, describe, it, vi } from 'vitest';

import { bootstrap } from '../src/create-app';

import type { INestApplication } from '@nestjs/common';

vi.mock('@novu/node', () => ({
	Novu: vi.fn().mockImplementation(() => ({
		trigger: vi.fn().mockResolvedValue(undefined),
	})),
}));

vi.mock(
	'tier',
	async (importOriginal: () => Promise<typeof import('tier')>) => {
		const tier = await importOriginal();
		const client = {
			// If orgname is 'no-stub', don't stub the subscription, instead create a real subscription
			subscribe: vi.fn().mockImplementation(async (arg1, arg2, arg3) => {
				const name = arg3?.info?.name as string | undefined;
				if (name?.includes('no-stub')) {
					console.log('not stubbing subscription');
					return await tier.subscribe(arg1, arg2, arg3);
				}
				console.log('stubbing subscription');
				return;
			}),
			// cancel: tier.cancel,
			// report: tier.report,
		};
		return { default: client };
	},
);

describe('App', () => {
	let app: INestApplication;

	beforeEach(async () => {
		app = await bootstrap();
		await app.listen(3002);
	});

	it('starts with mocked dependencies', () => {
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
			}, 1000000000);
		});
	}, 1000000000);
});
