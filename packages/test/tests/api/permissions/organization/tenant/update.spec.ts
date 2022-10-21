import { expect } from '@playwright/test';
import { sample } from '@self/seed';
import { randomUUID } from 'crypto';
import { test } from '../../../api-fixtures';

test('can update tenant in own org', async ({ request, tenant }) => {
	const res = await request.patch(`/tenants/${tenant.id}`, {
		data: {
			fullName: 'new name',
		},
	});

	expect(res.status()).toBe(200);
});

test('cannot update tenant in another org', async ({ request, org: _org }) => {
	const res = await request.patch(`/tenants/${sample.tenants[0]!.id}`, {
		data: {
			fullName: 'should not work',
		},
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});

test('cannot update non-existing tenant', async ({ request }) => {
	const res = await request.patch(`/tenants/${randomUUID()}`, {
		data: {
			fullName: 'should not work',
		},
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});
