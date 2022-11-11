import { expect } from '@playwright/test';
import * as R from 'remeda';
import type { GroupByMonthDto } from '../../../../../types/api';
import { getUrl } from '../../../../../utils/post-url';
import { test } from '../../../api-fixtures';

const sum = (items: GroupByMonthDto[]) => R.sumBy(items, (item) => item.amount);

const expensesParams = [
	// Portfolio Expenses
	...Array.from({ length: 3 }, () => ({
		postAt: new Date().toISOString().slice(0, 10),
		propertyId: null,
		unitId: null,
	})),

	// Property Expenses
	...Array.from({ length: 5 }, () => ({
		postAt: new Date().toISOString().slice(0, 10),
		unitId: null,
	})),

	// Unit Expenses
	...Array.from({ length: 7 }, () => ({
		postAt: new Date().toISOString().slice(0, 10),
		propertyId: null,
	})),
];

test.use({
	expenseCategoryParams: {
		isGroup: false,
	},

	expensesParams,
});

test('portfolio grouping is correct', async ({
	org,
	portfolio,
	request,
	expenses: _expenses,
}) => {
	const url = getUrl({
		organizationId: org.organization.id,
		portfolioId: portfolio.id,
	}).expensesAggregate;

	const res = await request.get(url);

	const data = (await res.json()) as GroupByMonthDto[];

	console.log({ data }, 'filter-location.spec.ts ~ 45');

	expect(sum(data)).toBe(15);
});

test("property grouping includes own units' expenses when setting propertyId", async ({
	org,
	portfolio,
	property,
	expenses: _expenses,
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

	expect(sum(data)).toBe(12);
});

// when setting propertyId to null
test('property grouping does NOT include any unit-specific expenses when setting propertyId to null', async ({
	org,
	portfolio,
	property: _property,
	expenses: _expenses,
	request,
}) => {
	const url = getUrl({
		organizationId: org.organization.id,
		portfolioId: portfolio.id,
	}).expensesAggregate;

	const res = await request.get(url, {
		params: {
			propertyId: 'null',
		},
	});

	const data = (await res.json()) as GroupByMonthDto[];

	expect(sum(data)).toBe(3);
});

test('unit grouping is correct', async ({
	org,
	portfolio,
	unit,
	request,
	expenses: _expenses,
}) => {
	const url = getUrl({
		organizationId: org.organization.id,
		portfolioId: portfolio.id,
	}).expensesAggregate;

	const res = await request.get(url, {
		params: {
			unitId: unit.id,
		},
	});

	const data = (await res.json()) as GroupByMonthDto[];

	expect(sum(data)).toBe(7);
});

// test('total portfolio expenses is the sum of expenses where propertyId is specified plus null', async ({
// 	org,
// 	portfolio,
// 	property,
// 	expenses,
// 	request,
// }) => {
// 	const url = getUrl({
// 		organizationId: org.organization.id,
// 		portfolioId: portfolio.id,
// 	}).expensesAggregate;

// 	const all = (await (await request.get(url)).json()) as GroupByMonthDto[];

// 	const nonSpecific = (await (
// 		await request.get(url, {
// 			params: {
// 				propertyId: 'null',
// 			},
// 		})
// 	).json()) as GroupByMonthDto[];

// 	const specific = (await (
// 		await request.get(url, {
// 			params: {
// 				propertyId: property.id,
// 			},
// 		})
// 	).json()) as GroupByMonthDto[];

// 	expect.soft(sum(specific)).toBe(3);
// 	expect.soft(sum(nonSpecific)).toBe(0);

// 	expect(sum(all)).toBe(sum(specific) + sum(nonSpecific));
// });

// test('can get expenses where property is unspecified', async ({
// 	org,
// 	portfolio,
// 	property,
// 	expenses,
// 	request,
// }) => {
// 	const url = getUrl({
// 		organizationId: org.organization.id,
// 		portfolioId: portfolio.id,
// 	}).expensesAggregate;

// 	const res = await request.get(url, {
// 		params: {
// 			propertyId: 'null',
// 		},
// 	});

// 	const data = (await res.json()) as GroupByMonthDto[];

// 	expect(R.sumBy(data, (d) => d.amount)).toBe(0);
// });
