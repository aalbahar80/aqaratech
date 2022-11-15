import { Cookie } from '@self/utils';
import type { RoleDto } from '../../../types/api';
import { resCheck } from '../../../utils/res-check';
import { testUsers } from '../fixtures/users/test-users';
import { apiURL } from './api-url';
import type { AllFixtures } from './test-fixtures.interface';

export const scopedRequestFixtures: AllFixtures = {
	// Determines the cookies that are sent with the request.
	userRoleType: ['ORGADMIN', { option: true }],

	scopedContext: async (
		{ userRoleType, browser, portfolio, tenant, request },
		use,
	) => {
		let url: string;
		let email: string;
		let storageStatePath: string;

		if (userRoleType === 'PORTFOLIO') {
			url = `${apiURL}/organizations/${portfolio.organizationId}/portfolios/${portfolio.id}/roles`;

			email = testUsers.portfolio.email;

			storageStatePath = testUsers.portfolio.storageStatePath;
		} else if (userRoleType === 'TENANT') {
			url = `${apiURL}/organizations/${tenant.organizationId}/tenants/${tenant.id}/roles`;

			email = testUsers.tenant.email;

			storageStatePath = testUsers.tenant.storageStatePath;

			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		} else if (userRoleType === 'ORGADMIN') {
			throw new Error(
				"Don't use ORGADMIN for scopedRequest. Use normal request instead.",
			);
		} else {
			throw new Error('Invalid userRoleType');
		}

		const res = await request.post(url, { data: { email } });
		resCheck(res);

		const body = (await res.json()) as RoleDto;

		// set role cookie

		const context = await browser.newContext({
			storageState: storageStatePath,
		});

		await context.addCookies([
			{
				name: Cookie.role,
				value: body.id,
				domain: 'localhost',
				path: '/',
				expires: -1,
				httpOnly: true,
				secure: false,
				sameSite: 'Lax',
			},
		]);

		await use(context);

		await context.close();
	},

	scopedRequest: async ({ scopedContext }, use) => {
		const scopedRequest = scopedContext.request;

		await use(scopedRequest);

		await scopedRequest.dispose();
	},

	scopedPage: async ({ scopedContext }, use) => {
		const page = await scopedContext.newPage();

		// eslint-disable-next-line @typescript-eslint/unbound-method
		const goto = page.goto;

		page.goto = async function (url, opts) {
			const res = await goto.call(page, url, opts);

			// https://github.com/sveltejs/kit/pull/6484
			await page.waitForSelector('body.started', { timeout: 5000 });

			return res;
		};

		await use(page);

		await page.close();
	},
};
