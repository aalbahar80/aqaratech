/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect } from '@playwright/test';
import { withQuery } from 'ufo';

import { prisma } from '../../prisma';
import { test } from '../api/api-fixtures';
import { apiURL } from '../api/fixtures/api-url';

import type { SearchDto } from '../../types/api';

// Test search authorization
// If role is ORGADMIN, only results from the organization should be returned
// If role is PORTFOLIO:
// - No porfolios should be returned
// - Only properties in that portfolio should be returned
// - Only tenant who have had at least one lease in a unit in a property in that portfolio should be returned

// Sample test data to enter using prisma

test.beforeEach(async ({ org }) => {
	// use prisma client to create data enough to test all cases.
	const organizationId = org.organization.id;

	const ORG2 = 'org2';
	const PORTFOLIO1 = 'portfolio1';
	const PORTFOLIO2 = 'portfolio2';
	const PORTFOLIO3 = 'portfolio3';
	const PROPERTY1 = 'property1';
	const PROPERTY2 = 'property2';
	const PROPERTY3 = 'property3';
	const PROPERTY4 = 'property4';

	// Delete

	await prisma.role.deleteMany({
		where: { portfolioId: { in: [PORTFOLIO1, PORTFOLIO2, PORTFOLIO3] } },
	});

	await prisma.property.deleteMany({
		where: { id: { in: [PROPERTY1, PROPERTY2, PROPERTY3, PROPERTY4] } },
	});

	await prisma.portfolio.deleteMany({
		where: { id: { in: [PORTFOLIO1, PORTFOLIO2, PORTFOLIO3] } },
	});

	await prisma.organization.deleteMany({ where: { id: { in: [ORG2] } } });

	// Create
	await prisma.organization.create({ data: { id: ORG2 } });

	await prisma.portfolio.createMany({
		data: [
			{ id: PORTFOLIO1, fullName: PORTFOLIO1, organizationId },
			{ id: PORTFOLIO2, fullName: PORTFOLIO2, organizationId: ORG2 },
			{ id: PORTFOLIO3, fullName: PORTFOLIO3, organizationId },
		],
	});

	await prisma.property.createMany({
		data: [
			// prettier-ignore
			{ id: PROPERTY1, label: PROPERTY1, portfolioId: PORTFOLIO1, organizationId },
			// prettier-ignore
			{ id: PROPERTY2, label: PROPERTY2, portfolioId: PORTFOLIO3, organizationId },
			// prettier-ignore
			{ id: PROPERTY3, label: PROPERTY3, portfolioId: PORTFOLIO3, organizationId }, // FIX: rm
			// prettier-ignore
			{ id: PROPERTY4, label: PROPERTY4, portfolioId: PORTFOLIO2, organizationId: ORG2 },
		],
	});
});

test.describe('search authorization: admin', () => {
	test('org admin: portfolio', async ({ org, request }) => {
		const searchUrl = `/organizations/${org.organization.id}/search`;

		const query = 'portfolio';

		const url = apiURL + withQuery(searchUrl, { query });

		const res = await request.get(url);

		expect.soft(res.status()).toBe(200);

		const data = (await res.json()) as SearchDto;

		expect(data.portfolio).toHaveLength(2);
		expect(data.portfolio[0]!.id).toBe('portfolio1');
		expect(data.portfolio[1]!.id).toBe('portfolio3');
	});

	test('org admin: property', async ({ org, request }) => {
		const searchUrl = `/organizations/${org.organization.id}/search`;

		const query = 'property';

		const url = apiURL + withQuery(searchUrl, { query });

		const res = await request.get(url);

		expect.soft(res.status()).toBe(200);

		const data = (await res.json()) as SearchDto;

		expect(data.property).toHaveLength(3);
		expect(data.property[0]!.id).toBe('property1');
		expect(data.property[1]!.id).toBe('property2');
		expect(data.property[2]!.id).toBe('property3');
	});
});

test.describe('search authorization: portfolio', () => {
	test.use({ userRoleType: 'PORTFOLIO' });

	test('portfolio admin: portfolio', async ({ request, org }) => {
		const searchUrl = `/organizations/${org.organization.id}/search`;

		const query = 'portfolio';

		const url = apiURL + withQuery(searchUrl, { query });

		const res = await request.get(url);

		expect.soft(res.status()).toBe(200);

		const data = (await res.json()) as SearchDto;

		expect(data.portfolio).toHaveLength(0);
	});

	test('portfolio admin: property', async ({ request, org }) => {
		const searchUrl = `/organizations/${org.organization.id}/search`;

		const query = 'property';

		const url = apiURL + withQuery(searchUrl, { query });

		const res = await request.get(url);

		expect.soft(res.status()).toBe(200);

		const data = (await res.json()) as SearchDto;

		expect(data.property).toHaveLength(1);
		expect(data.property[0]!.id).toBe('property1');
	});
});
