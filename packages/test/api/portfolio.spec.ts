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

test.skip(`can be created with minimal fields`, async ({ request }) => {
	const res = await request.post(`/portfolios`, {
		data: {
			fullName: 'Test Portfolio',
			organizationId,
		},
	});

	await expect(res).toBeOK();
	expect(res.status()).toBe(201);
});

test.skip(`can update fullName only`, async ({ request }) => {
	const res = await request.patch(`/portfolios/${portfolio.id}`, {
		data: {
			organizationId,
			fullName: 'Test Portfolio',
		},
	});

	await expect(res).toBeOK();
});

test.skip(`can update single field only`, async ({ request }) => {
	const res = await request.patch(`/portfolios/${portfolio.id}`, {
		data: {
			organizationId,
			label: 'Test Portfolio label',
		},
	});

	await expect(res).toBeOK();
});

test.skip(`returns title field`, async ({ request }) => {
	const res = await request.get(`/portfolios/${portfolio.id}`, {});

	const data = (await res.json()) as PortfolioDto;
	expect.soft(data).toHaveProperty('fullName');
	expect(data).toHaveProperty('title');
});
