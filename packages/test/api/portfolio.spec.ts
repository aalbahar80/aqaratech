import { expect } from '@playwright/test';
import { portfolioFactory } from '@self/seed';
import * as R from 'remeda';
import type { PortfolioDto } from '../types/api';
import { test } from './api-fixtures';

test(`can't be created without orgId`, async ({ request }) => {
	const portfolio = R.pick(
		portfolioFactory.build({
			organizationId: '',
		}),
		['fullName'],
	);

	const res = await request.post(`/portfolios`, {
		data: portfolio,
	});

	await expect(res).not.toBeOK();

	expect(res.status()).toBe(400);
});

test(`can't be created without fullName`, async ({ request, org }) => {
	const portfolio = R.pick(
		portfolioFactory.build({
			organizationId: org.organization.id,
			label: '',
		}),
		['organizationId', 'label'],
	);

	const res = await request.post(`/portfolios`, {
		data: portfolio,
	});

	await expect(res).not.toBeOK();

	expect(res.status()).toBe(400);
});

test(`can be created with minimal fields`, async ({ request, org }) => {
	const portfolio = R.pick(
		portfolioFactory.build({
			organizationId: org.organization.id,
		}),
		['organizationId', 'fullName'],
	);

	const res = await request.post(`/portfolios`, {
		data: portfolio,
	});

	await expect(res).toBeOK();

	expect(res.status()).toBe(201);
});

test(`can update fullName only`, async ({ request, portfolio }) => {
	const res = await request.patch(`/portfolios/${portfolio.id}`, {
		data: {
			organizationId: portfolio.organizationId,
			fullName: 'new full name',
		},
	});

	await expect(res).toBeOK();

	const data = (await res.json()) as PortfolioDto;

	expect(data.fullName).toBe('new full name');
});

test(`can update single field only`, async ({ request, portfolio }) => {
	const res = await request.patch(`/portfolios/${portfolio.id}`, {
		data: {
			organizationId: portfolio.organizationId,
			label: 'new label',
		},
	});

	await expect(res).toBeOK();

	// expect returned data to be updated
	const data = (await res.json()) as PortfolioDto;

	expect(data.label).toBe('new label');
});

test(`returns title field`, async ({ request, portfolio }) => {
	const res = await request.get(`/portfolios/${portfolio.id}`);

	const data = (await res.json()) as PortfolioDto;

	expect.soft(data).toHaveProperty('fullName');

	expect(data).toHaveProperty('title');
});
