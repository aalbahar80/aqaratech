import { expect } from '@playwright/test';

import { test } from '../../../api-fixtures';

test.describe('portfolio role can view tenant', () => {
	test.use({ userRoleType: 'PORTFOLIO' });

	test('if own tenant', async ({ request, lease }) => {
		const res = await request.get(`/tenants/${lease.tenantId}`);
		await expect(res).toBeOK();
	});

	test('not if own tenant', async ({ request, tenant }) => {
		const res = await request.get(`/tenants/${tenant.id}`);
		await expect(res).not.toBeOK();
	});
});
