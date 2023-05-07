import { InjectionToken } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import prisma from 'src/test/__mocks__/prisma';

export const tokenMocker = function (token?: InjectionToken) {
	if (token === PrismaService) {
		// Return the PrismaService defined in __mocks__. This is so we can get a
		// reference to the mock instance during any test. This is useful for
		// spying/mocking on methods.
		return prisma;
	}

	if (typeof token === 'function') {
		console.log({ token, typeof: typeof token });
		const mock = vi.fn().mockImplementation(token);
		return mock;
		// return mockDeep();
	}

	if (typeof token === 'symbol') {
		return token;
	}

	return;
};
