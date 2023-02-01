import { randomUUID } from 'crypto';

import { expect } from '@playwright/test';
import * as R from 'remeda';

import { leaseInvoiceFactory, sample } from '@self/seed';

import { test } from '../../../api-fixtures';

const newLeaseInvoice = R.pick(
	leaseInvoiceFactory.build({
		organizationId: '',
		portfolioId: '',
		leaseId: '',
	}),
	['amount', 'postAt', 'memo'],
);

test('can update leaseInvoice in own org', async ({ request, invoice }) => {
	const res = await request.patch(`/leaseInvoices/${invoice.id}`, {
		data: newLeaseInvoice,
	});

	expect(res.status()).toBe(200);
});

test('cannot update leaseInvoice in another org', async ({
	request,
	org: _org,
}) => {
	const res = await request.patch(
		`/leaseInvoices/${sample.leaseInvoices[0].id}`,
		{
			data: newLeaseInvoice,
		},
	);

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(404);
});

test('cannot update non-existing leaseInvoice', async ({ request }) => {
	const res = await request.patch(`/leaseInvoices/${randomUUID()}`, {
		data: newLeaseInvoice,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(404);
});
