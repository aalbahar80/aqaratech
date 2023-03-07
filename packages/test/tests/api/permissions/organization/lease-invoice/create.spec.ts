import { randomUUID } from 'crypto';

import { expect } from '@playwright/test';
import * as R from 'remeda';

import { leaseInvoiceFactory, sample } from '@self/seed';

import { PostUrl } from '../../../../../utils/post-url';
import { test } from '../../../api-fixtures';

const keys = [
	'portfolioId',
	'leaseId',
	'amount',
	'isPaid',
	'memo',
	'postAt',
	'paidAt',
] as const;

test('can create leaseInvoice in own org', async ({ request, org, lease }) => {
	const leaseInvoice = R.pick(
		leaseInvoiceFactory.build({
			organizationId: org.organization.id,
			portfolioId: lease.portfolioId,
			leaseId: lease.id,
		}),
		keys,
	);

	const res = await request.post(PostUrl(org.organization.id).invoice, {
		data: leaseInvoice,
	});

	expect(res.status()).toBe(201);
});

test('cannot create leaseInvoice in another org', async ({
	request,
	org,
	lease,
}) => {
	const leaseInvoice = R.pick(
		leaseInvoiceFactory.build({
			organizationId: org.organization.id,
			portfolioId: lease.portfolioId,
			leaseId: lease.id,
		}),
		keys,
	);

	const res = await request.post(PostUrl(sample.organizations[0].id).invoice, {
		data: leaseInvoice,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403); // or 404?
});

test('cannot create leaseInvoice in non-existing lease', async ({
	request,
	org,
	portfolio,
}) => {
	const leaseInvoice = R.pick(
		leaseInvoiceFactory.build({
			organizationId: randomUUID(),
			portfolioId: portfolio.id,
			leaseId: randomUUID(),
		}),
		keys,
	);

	const res = await request.post(PostUrl(org.organization.id).invoice, {
		data: leaseInvoice,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(404);
});

test('cannot create leaseInvoice in non-existing portfolio', async ({
	request,
	org,
	lease,
}) => {
	const leaseInvoice = R.pick(
		leaseInvoiceFactory.build({
			organizationId: org.organization.id,
			portfolioId: randomUUID(),
			leaseId: lease.id,
		}),
		keys,
	);

	const res = await request.post(PostUrl(org.organization.id).invoice, {
		data: leaseInvoice,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(404);
});

test('cannot create leaseInvoice in non-existing organization', async ({
	request,
	lease,
}) => {
	const leaseInvoice = R.pick(
		leaseInvoiceFactory.build({
			organizationId: randomUUID(),
			portfolioId: lease.portfolioId,
			leaseId: lease.id,
		}),
		keys,
	);

	const res = await request.post(PostUrl(randomUUID()).invoice, {
		data: leaseInvoice,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});
