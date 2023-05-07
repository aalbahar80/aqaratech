import { InjectionToken } from '@nestjs/common';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

import { PrismaService } from 'src/prisma/prisma.service';
import prisma from 'src/test/__mocks__/prisma';

const moduleMocker = new ModuleMocker(global);

export const tokenMocker = function (token?: InjectionToken) {
	if (token === PrismaService) {
		// Return the PrismaService defined in __mocks__. This is so we can get a
		// reference to the mock instance during any test. This is useful for
		// spying/mocking on methods.
		return prisma;
	}

	if (typeof token === 'function') {
		// default
		// return token;

		// vitest
		// return vi.fn();

		// vitest-mock-extended
		// return mockDeep();

		// Jest
		// https://docs.nestjs.com/fundamentals/testing#auto-mocking
		type T = typeof token;
		const mockMetadata = moduleMocker.getMetadata(
			token,
		) as MockFunctionMetadata<T>;
		const Mock = moduleMocker.generateFromMetadata(mockMetadata);
		return new Mock();
	}

	if (typeof token === 'symbol') {
		return token;
	}

	return;
};
