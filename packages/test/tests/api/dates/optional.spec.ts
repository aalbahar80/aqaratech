import { expect } from '@playwright/test';
import { leaseInvoiceFactory, tenantFactory } from '@self/seed';
import * as R from 'remeda';
import { test } from '../api-fixtures';

// test that tenant.dob can be undefined, or an ISO string with time, or an ISO string without time

test('tenant dob default to midnight UTC', async ({ request, org }) => {
	const tenant = R.pick(
		tenantFactory.build({
			organizationId: org.organization.id,
			dob: '2022-01-01',
		}),
		['fullName', 'dob'],
	);

	const url = `/organizations/${org.organization.id}/tenants`;

	const res = await request.post(url, { data: tenant });

	const body: unknown = await res.json();

	expect(body).toHaveProperty('dob', '2022-01-01T00:00:00.000Z');
});

test('portfolio dob default to midnight UTC', async ({ request, org }) => {
	const portfolio = R.pick(
		tenantFactory.build({
			organizationId: org.organization.id,
			dob: '2022-01-01',
		}),
		['fullName', 'dob'],
	);

	const url = `/organizations/${org.organization.id}/portfolios`;

	const res = await request.post(url, { data: portfolio });

	const body: unknown = await res.json();

	expect(body).toHaveProperty('dob', '2022-01-01T00:00:00.000Z');
});

test.skip('leaseInvoice dueAt default to midnight UTC', async ({
	request,
	org,
	portfolio,
	lease,
}) => {
	const invoice = R.pick(
		leaseInvoiceFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			leaseId: lease.id,
			dueAt: '2022-01-01',
		}),
		['amount', 'postAt', 'leaseId', 'portfolioId'],
	);

	// TODO: check/confirm url
	const url = `/organizations/${org.organization.id}/lease-invoices`;

	const res = await request.post(url, { data: invoice });

	const body: unknown = await res.json();

	expect(body).toHaveProperty('dueAt', '2022-01-01T00:00:00.000Z');
});
