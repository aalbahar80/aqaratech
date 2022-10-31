import type { RoleDto } from '../../../types/api';
import { testUsers } from '../fixtures/users/test-users';
import { apiURL } from './api-url';
import type { AllFixtures } from './test-fixtures.interface';

export const scopedRequestFixtures: AllFixtures = {
	// Determines the cookies that are sent with the request.
	userRoleType: ['ORGADMIN', { option: true }],

	scopedRequest: async ({ userRoleType, browser, portfolio, request }, use) => {
		if (userRoleType === 'PORTFOLIO') {
			// add user to fresh portfolio

			const url = `${apiURL}/organizations/${portfolio.organizationId}/portfolios/${portfolio.id}/roles`;

			const res = await request.post(url, {
				data: { email: testUsers.portfolio.email },
			});

			const body = (await res.json()) as RoleDto;

			if (!res.ok) {
				throw new Error('Failed to add user to portfolio');
			}

			// set role cookie

			const context = await browser.newContext({
				storageState: testUsers.portfolio.storageStatePath,
			});

			await context.addCookies([
				{
					name: 'role',
					value: body.id,
					domain: 'localhost',
					path: '/',
					expires: -1,
					httpOnly: true,
					secure: false,
					sameSite: 'Lax',
				},
			]);

			const scopedRequest = context.request;

			await use(scopedRequest);

			await scopedRequest.dispose();
		}
	},
};
