import { expect } from '@playwright/test';
import { sample, tenantFactory } from '@self/seed';
import { randomUUID } from 'crypto';
import * as R from 'remeda';
import { test } from '../../../api-fixtures';

const newTenant = R.pick(
	tenantFactory.build({
		organizationId: '',
	}),
	['fullName'],
);

test('can update tenant in own org', async ({ request, tenant }) => {
	const res = await request.patch(`/tenants/${tenant.id}`, {
		data: newTenant,
	});

	expect(res.status()).toBe(200);
});

test('cannot update tenant in another org', async ({ request, org: _org }) => {
	const res = await request.patch(`/tenants/${sample.tenants[0]!.id}`, {
		data: newTenant,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});

test('cannot update non-existing tenant', async ({ request }) => {
	const res = await request.patch(`/tenants/${randomUUID()}`, {
		data: newTenant,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});
