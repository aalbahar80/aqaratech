import { expect } from '@playwright/test';
import { leaseFactory } from '@self/seed';
import * as R from 'remeda';
import type { PartialLeaseDto } from '../../types/api';
import { test } from './api-fixtures';

const utc = (year: number, month: number, day: number) =>
	new Date(Date.UTC(year, month, day)).toISOString();

test('lease start date cannot be after end date', async ({
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
			start: utc(2021, 0, 1),
			end: utc(2020, 0, 1),
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

	expect(res.status()).toBe(400);

	const body: unknown = await res.json();

	expect
		.soft(body)
		.toHaveProperty(
			'fieldErrors.start',
			expect.arrayContaining(['Start date must be before end date']),
		);

	expect
		.soft(body)
		.toHaveProperty(
			'fieldErrors.end',
			expect.arrayContaining(['End date must be after start date']),
		);
});

test('start needs to be a properly formatted date', async ({
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
			start: '2019-1-1',
			end: utc(2020, 0, 1),
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

	expect.soft(res.status()).toBe(400);

	const body: unknown = await res.json();

	expect
		.soft(body)
		.toHaveProperty(
			'fieldErrors.start',
			expect.arrayContaining(['Invalid date']),
		);
});

test('start needs to be a valid datestring', async ({
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
			start: 'abc',
			end: utc(2020, 0, 1),
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

	expect(res.status()).toBe(400);

	const body: unknown = await res.json();

	expect(body).toHaveProperty(
		'fieldErrors.start',
		expect.arrayContaining(['Invalid date']),
	);
});

test('start can be a date only', async ({
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
			start: '2022-01-01',
			end: utc(2022, 11, 1),
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

	expect.soft(res.status()).toBe(201);

	const body: unknown = (await res.json()) as PartialLeaseDto;

	expect(body).toHaveProperty('start', '2022-01-01T00:00:00.000Z');
});

test('end can be a date only', async ({
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
			start: utc(2021, 0, 1),
			end: '2022-01-01',
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

	expect.soft(res.status()).toBe(201);

	const body: unknown = (await res.json()) as PartialLeaseDto;

	expect(body).toHaveProperty('end', '2022-01-01T00:00:00.000Z');
});

test('start can be an ISO date', async ({
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
			start: utc(2022, 0, 1),
			end: utc(2022, 11, 1),
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

	expect.soft(res.status()).toBe(201);

	const body: unknown = (await res.json()) as PartialLeaseDto;

	expect(body).toHaveProperty('start', '2022-01-01T00:00:00.000Z');
});

test('end can be an ISO date', async ({
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
			start: '2022-01-01',
			end: utc(2022, 11, 1),
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

	expect.soft(res.status()).toBe(201);

	const body: unknown = (await res.json()) as PartialLeaseDto;

	expect(body).toHaveProperty('end', '2022-12-01T00:00:00.000Z');
});
