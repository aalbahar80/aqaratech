import { test } from '@playwright/test';
import { testOrgRoleId } from '@self/seed';

test.use({
	extraHTTPHeaders: async ({}, use) => {
		// Get token
		const cookies = (await import('../storageState.json')).cookies;
		const accessToken = cookies.find((c) => c.name === 'accessToken')?.value;
		if (!accessToken) {
			throw new Error('No access token found');
		}

		// Use token
		const extraHTTPHeaders = {
			Authorization: `Bearer ${accessToken}`,
			'x-role-id': testOrgRoleId,
		};
		await use(extraHTTPHeaders);
	},
});

export { test };
