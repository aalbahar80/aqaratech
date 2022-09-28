import { test as base } from '@playwright/test';
import { organizationFactory, portfolioFactory } from '@self/seed';
import * as R from 'remeda';
import type { OrganizationCreatedDto, PortfolioDto } from '../types/api';
import { getToken } from '../utils/get-token';

// Extend basic test by providing an "org" fixture.
// `org` is a fresh organization. Role ID header is set in extraHTTPHeaders.
export const test = base.extend<{
	org: OrganizationCreatedDto;
	portfolio: PortfolioDto;
}>({
	org: async ({ baseURL, browser }, use) => {
		// create a new context.
		// It's not inheriting contextOptions, because contextOptions is empty. Why is it empty?
		// contextOptions might be empty because this is executed before test.use is called?
		if (!baseURL) throw new Error('baseURL is not set');

		const context = await browser.newContext({
			baseURL,
			extraHTTPHeaders: {
				Authorization: `Bearer ${await getToken({
					name: 'accessToken',
					domain: baseURL,
				})}`,
			},
		});

		const organization = organizationFactory.build();

		const orgPicked = R.pick(organization, ['fullName']);

		const headers = {
			Authorization: `Bearer ${await getToken({
				name: 'accessToken',
				domain: baseURL,
			})}`,
		};

		const res = await context.request.post(`/organizations`, {
			headers,
			data: orgPicked,
		});

		const created = (await res.json()) as OrganizationCreatedDto;

		await use(created);
		await context.close();
	},
	portfolio: async ({ org, request }, use) => {
		// create fresh portfolio
		const portfolio = portfolioFactory.build({
			organizationId: org.organization.id,
		});

		const picked = R.pick(portfolio, ['fullName', 'organizationId']);

		const res = await request.post(`/portfolios`, { data: picked });

		const created = (await res.json()) as PortfolioDto;

		await use(created);
	},
});
