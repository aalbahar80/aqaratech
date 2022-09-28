import { getToken } from '../utils/get-token';
import { test } from './api-fixtures';

// Every test gets a fresh organization/role
test.use({
	extraHTTPHeaders: async ({ baseURL, org }, use) => {
		const extraHTTPHeaders = {
			Authorization: `Bearer ${await getToken({
				name: 'accessToken',
				domain: baseURL,
			})}`,
			'x-role-id': org.roleId,
		};
		await use(extraHTTPHeaders);
	},
});

export { test };
