import { test } from '@playwright/test';
import { testOrgRoleId } from '@self/seed';
import { getToken } from '../utils/get-token';

test.use({
	extraHTTPHeaders: async ({ baseURL }, use) => {
		const extraHTTPHeaders = {
			Authorization: `Bearer ${await getToken({
				name: 'accessToken',
				domain: baseURL,
			})}`,
			'x-role-id': testOrgRoleId,
		};
		await use(extraHTTPHeaders);
	},
});

export { test };
