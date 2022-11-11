import { expect } from '@playwright/test';
import { leaseFactory, sample } from '@self/seed';
import { randomUUID } from 'crypto';
import * as R from 'remeda';
import { test } from '../../../api-fixtures';

test('can create lease in own org', async ({
	request,
	org,
	portfolio,
	unit,
	tenant,
}) => {
	const lease = R.pick(
		leaseFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			unitId: unit.id,
			tenantId: tenant.id,
		}),
		[
			'portfolioId',
			'unitId',
			'tenantId',
			'start',
			'end',
			'monthlyRent',
			'notify',
			'canPay',
		],
	);

	const url = `/organizations/${org.organization.id}/leases`;

	const res = await request.post(url, { data: lease });

	expect(res.status()).toBe(201);
});

test('cannot create lease in another org', async ({
	request,
	org,
	portfolio,
	unit,
	tenant,
}) => {
	const lease = R.pick(
		leaseFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			unitId: unit.id,
			tenantId: tenant.id,
		}),
		[
			'portfolioId',
			'unitId',
			'tenantId',
			'start',
			'end',
			'monthlyRent',
			'notify',
			'canPay',
		],
	);

	const url = `/organizations/${sample.organizations[0].id}/leases`;

	const res = await request.post(url, { data: lease });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403); // or 404?
});

test('cannot create lease in non-existing unit', async ({
	request,
	org,
	portfolio,
	tenant,
}) => {
	const lease = R.pick(
		leaseFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			unitId: randomUUID(),
			tenantId: tenant.id,
		}),
		[
			'portfolioId',
			'unitId',
			'tenantId',
			'start',
			'end',
			'monthlyRent',
			'notify',
			'canPay',
		],
	);

	const url = `/organizations/${org.organization.id}/leases`;

	const res = await request.post(url, { data: lease });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(404);
});

test('cannot create lease in non-existing tenant', async ({
	request,
	org,
	portfolio,
	unit,
}) => {
	const lease = R.pick(
		leaseFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			unitId: unit.id,
			tenantId: randomUUID(),
		}),
		[
			'portfolioId',
			'unitId',
			'tenantId',
			'start',
			'end',
			'monthlyRent',
			'notify',
			'canPay',
		],
	);

	const url = `/organizations/${org.organization.id}/leases`;

	const res = await request.post(url, { data: lease });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(404);
});
