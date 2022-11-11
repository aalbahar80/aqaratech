import { expect } from '@playwright/test';
import { leaseFactory, sample } from '@self/seed';
import { randomUUID } from 'crypto';
import * as R from 'remeda';
import { test } from '../../../api-fixtures';

const newLease = R.pick(
	leaseFactory.build({
		organizationId: '',
		portfolioId: '',
		unitId: '',
		tenantId: '',
	}),
	['start', 'end', 'monthlyRent', 'notify', 'canPay'],
);

test('can update lease in own org', async ({ request, lease }) => {
	const res = await request.patch(`/leases/${lease.id}`, {
		data: newLease,
	});

	expect(res.status()).toBe(200);
});

test('cannot update lease in another org', async ({ request, org: _org }) => {
	const res = await request.patch(`/leases/${sample.leases[0].id}`, {
		data: newLease,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});

test('cannot update non-existing lease', async ({ request }) => {
	const res = await request.patch(`/leases/${randomUUID()}`, {
		data: newLease,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});
