import { expect } from '@playwright/test';
import * as R from 'remeda';

import { expenseFactory } from '@self/seed';

import { test } from '../../../api-fixtures';

import type { PortfolioDto } from '../../../../../types/api';


test('expense.property belongs to expense.portfolio', async ({
	portfolio,
	property,
	request,
}) => {
	// create new portfolio
	const freshPortfolio = (await (
		await request.post(
			`/organizations/${portfolio.organizationId}/portfolios`,
			{
				data: {
					fullName: 'New Portfolio',
				},
			},
		)
	).json()) as PortfolioDto;

	// try to create an expense with mismatched portfolioId
	const url = `/organizations/${portfolio.organizationId}/expenses`;

	const res = await request.post(url, {
		data: R.pick(
			expenseFactory.build({
				organizationId: portfolio.organizationId,
				portfolioId: freshPortfolio.id, // mismatched portfolioId
				propertyId: property.id,
			}),
			['portfolioId', 'propertyId', 'unitId', 'amount', 'postAt'],
		),
	});

	expect(res.status()).toBe(400);
});

test('expense.unit belongs to expense.portfolio', async ({
	portfolio,
	unit,
	request,
}) => {
	// create new portfolio
	const freshPortfolio = (await (
		await request.post(
			`/organizations/${portfolio.organizationId}/portfolios`,
			{
				data: {
					fullName: 'New Portfolio',
				},
			},
		)
	).json()) as PortfolioDto;

	// try to create an expense with mismatched portfolioId
	const url = `/organizations/${portfolio.organizationId}/expenses`;

	const res = await request.post(url, {
		data: R.pick(
			expenseFactory.build({
				organizationId: portfolio.organizationId,
				portfolioId: freshPortfolio.id, // mismatched portfolioId
				unitId: unit.id,
			}),
			['portfolioId', 'propertyId', 'unitId', 'amount', 'postAt'],
		),
	});

	expect(res.status()).toBe(400);
});
