import { expect } from '@playwright/test';
import { organizationFactory, portfolioFactory } from '@self/seed';
import * as R from 'remeda';
import { withQuery } from 'ufo';
import type { OrganizationCreatedDto, PortfolioDto } from '../../types/api';
import { test } from '../api-config';

test.describe('one', () => {
	let portfolioId: string;
	let newRoleId: string;
	let orgId: string;
	test.beforeEach(async ({ request }) => {
		// create fresh org
		const org = organizationFactory.build();

		const orgPicked = R.pick(org, ['fullName']);

		const orgRes = await request.post(`/organizations`, {
			data: orgPicked,
		});

		expect.soft(orgRes.status()).toBe(201);

		const orgCreated = (await orgRes.json()) as OrganizationCreatedDto;

		// create fresh portfolio
		const portfolio = portfolioFactory.build({
			organizationId: orgCreated.organization.id,
		});

		const picked = R.pick(portfolio, ['fullName', 'organizationId']);

		const res = await request.post(`/portfolios`, {
			data: picked,
			headers: {
				'x-role-id': orgCreated.roleId,
			},
		});

		const created = (await res.json()) as PortfolioDto;

		expect(res.status()).toBe(201);

		orgId = orgCreated.organization.id;
		newRoleId = orgCreated.roleId;
		portfolioId = created.id;
	});

	test('handle noSuchBucket gracefully', async ({ request }) => {
		const url = withQuery('/files', {
			relationKey: 'portfolio',
			relationValue: portfolioId,
		});

		const res = await request.get(url, {
			headers: {
				'x-role-id': newRoleId,
			},
		});

		expect(res.status()).toBe(200);
		// response should be an object with a property named "results" that is an empty array
		expect(await res.json()).toMatchObject({
			results: [],
		});
	});

	test('buckets are automatically created', async ({ request }) => {
		const url = withQuery('/files', {
			relationKey: 'portfolio',
			relationValue: portfolioId,
		});

		const fileName = 'test.txt';

		const res = await request.post(url, {
			headers: {
				'x-role-id': newRoleId,
			},
			multipart: {
				fileName: fileName,
				relationKey: 'portfolio',
				relationValue: portfolioId,
				organizationId: orgId,
				file: {
					name: fileName,
					mimeType: 'text/plain',
					buffer: Buffer.from('hello world'),
				},
			},
		});

		expect(res.status()).toBe(201);

		const data = await res.text();
		expect(data).toBe('test.txt');
	});
});
