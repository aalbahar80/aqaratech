import { expect } from '@playwright/test';
import * as R from 'remeda';

import { getUrl } from '../../../../../utils/post-url';
import { test } from '../../../api-fixtures';

import type { GroupByMonthDto } from '../../../../../types/api';

test.use({
	expenseCategoryParams: {
		isGroup: false,
	},

	expensesParams: Array.from({ length: 3 }, () => ({
		postAt: new Date().toISOString().slice(0, 10),
	})),
});

test('returns correct sum when queried by portfolio', async ({
	org,
	portfolio,
	expenses,
	request,
}) => {
	const url = getUrl({
		organizationId: org.organization.id,
		portfolioId: portfolio.id,
	}).expensesAggregate;

	const res = await request.get(url);

	const data = (await res.json()) as GroupByMonthDto[];

	expect(R.sumBy(data, (d) => d.amount)).toBe(
		R.sumBy(expenses, (e) => e.amount),
	);
});

test('returns correct sum when queried by property', async ({
	org,
	portfolio,
	property,
	expenses,
	request,
}) => {
	const url = getUrl({
		organizationId: org.organization.id,
		portfolioId: portfolio.id,
	}).expensesAggregate;

	const res = await request.get(url, {
		params: {
			propertyId: property.id,
		},
	});

	const data = (await res.json()) as GroupByMonthDto[];

	expect(R.sumBy(data, (d) => d.amount)).toBe(
		R.sumBy(expenses, (e) => e.amount),
	);
});

test('returns correct sum when queried by unit', async ({
	org,
	portfolio,
	property,
	unit,
	expenses,
	request,
}) => {
	const url = getUrl({
		organizationId: org.organization.id,
		portfolioId: portfolio.id,
	}).expensesAggregate;

	const res = await request.get(url, {
		params: {
			propertyId: property.id,
			unitId: unit.id,
		},
	});

	const data = (await res.json()) as GroupByMonthDto[];

	expect(R.sumBy(data, (d) => d.amount)).toBe(
		R.sumBy(expenses, (e) => e.amount),
	);
});

test('returns correct sum when queried by property and unit', async ({
	org,
	portfolio,
	property,
	unit,
	expenses,
	request,
}) => {
	const url = getUrl({
		organizationId: org.organization.id,
		portfolioId: portfolio.id,
	}).expensesAggregate;

	const res = await request.get(url, {
		params: {
			propertyId: property.id,
			unitId: unit.id,
		},
	});

	const data = (await res.json()) as GroupByMonthDto[];

	expect(R.sumBy(data, (d) => d.amount)).toBe(
		R.sumBy(expenses, (e) => e.amount),
	);
});
