import { InjectionToken } from '@nestjs/common';

export const tokenMocker = function (token?: InjectionToken) {
	if (typeof token === 'function') {
		// @ts-expect-error test
		const mock = vi.fn().mockImplementation(token);
		return mock;
	}

	if (typeof token === 'symbol') {
		return token;
	}

	return;
};
