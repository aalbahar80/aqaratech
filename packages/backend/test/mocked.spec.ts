import { beforeEach, describe, it, vi } from 'vitest';

import { bootstrap } from '../src/create-app';

import type { INestApplication } from '@nestjs/common';

vi.mock('@novu/node', () => ({
	Novu: vi.fn().mockImplementation(() => ({
		trigger: vi.fn().mockResolvedValue(undefined),
	})),
}));

describe('App', () => {
	let app: INestApplication;

	beforeEach(async () => {
		app = await bootstrap();
		await app.listen(3002);
	});

	it('starts with mocked dependencies', () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, 1000000000);
		});
	}, 1000000000);
});
