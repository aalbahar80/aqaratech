import { expect } from '@playwright/test';
import { expenseFactory, portfolioFactory } from '@self/seed';
import * as R from 'remeda';
import type { PortfolioDto } from '../../../../../types/api';
import { test } from '../../../api-fixtures';

test('expense.property.portfolioId matches expense.portfolioId', async ({
	portfolio,
	property,
	request,
}) => {
	// create new portfolio
	const freshPortfolio = (await (
		await request.post(
			`/organizations/${portfolio.organizationId}/portfolios`,
			{
				data: R.pick(
					portfolioFactory.build({
						organizationId: portfolio.organizationId,
					}),
					['fullName'],
				),
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

test('expense.unit.portfolioId matches expense.portfolioId', async ({
	portfolio,
	unit,
	request,
}) => {
	// create new portfolio
	const freshPortfolio = (await (
		await request.post(
			`/organizations/${portfolio.organizationId}/portfolios`,
			{
				data: R.pick(
					portfolioFactory.build({
						organizationId: portfolio.organizationId,
					}),
					['fullName'],
				),
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
