import { expect } from '@playwright/test';

import { testOrgEmail } from '@self/seed';
import { Cookie, PageType, getRoute } from '@self/utils';

import { getCookie } from '../../utils/get-cookie';
import { test as base } from '../api/api-fixtures';
import { siteURL } from '../api/fixtures/site-url';

const test = base.extend({
	page: async ({ browser }, use) => {
		// - user has multiple roles, both in same org and different orgs
		// - user has no role cookie set (simulating new login)
		// - check that the role is resolved to one with same orgId
		// - check that the role is resolved to one with higher priority

		// create new context avoid interfering with interfering with other tests
		const context = await browser.newContext();

		const page = await context.newPage();

		// clear the role cookie only
		const cookies = await page.context().cookies();

		await page.context().clearCookies();
		await page
			.context()
			.addCookies(cookies.filter((cookie) => cookie.name !== Cookie.role));

		// assert that the role cookie is cleared
		expect(
			await getCookie({
				context: page.context(),
				cookieName: Cookie.role,
			}),
		).toBeUndefined();

		await use(page);

		await context.close();
	},
});

test.use({
	rolesParams: [
		// skip creating the orgadmin role because it is created by default
		{
			roleType: 'PORTFOLIO',
			email: testOrgEmail,
		},
		{
			roleType: 'TENANT',
			email: testOrgEmail,
		},
	],
});

test.describe('role is resolved correctly', () => {
	test('correct role cookie is set', async ({ page, invoice, org }) => {
		const url = getRoute({
			entity: 'leaseInvoice',
			pageType: PageType.Id,
			id: invoice.id,
			params: {
				organizationId: invoice.organizationId,
				portfolioId: invoice.portfolioId,
			},
		});

		await page.goto(url);

		// check that the role is resolved to one with same orgId
		const roleCookie = await getCookie({
			context: page.context(),
			cookieName: Cookie.role,
		});

		expect.soft(roleCookie).toMatchObject({
			value: org.roleId,
		});
	});

	test('response is OK', async ({ page, invoice }) => {
		const url = getRoute({
			entity: 'leaseInvoice',
			pageType: PageType.Id,
			id: invoice.id,
			params: {
				organizationId: invoice.organizationId,
				portfolioId: invoice.portfolioId,
			},
		});

		// prepare to catch response
		const responsePromise = page.waitForResponse(url);

		await page.goto(url);

		// check that response is ok
		const response = await responsePromise;
		expect.soft(response.status()).toBe(200);
	});

	test('existing role cookie is not overwritten', async ({ page, invoice }) => {
		// add a role cookie with a different orgId
		await page.context().addCookies([
			{
				name: Cookie.role,
				value: 'some-random-role-id',
				domain: new URL(siteURL).hostname,
				path: '/',
			},
		]);
		const url = getRoute({
			entity: 'leaseInvoice',
			pageType: PageType.Id,
			id: invoice.id,
			params: {
				organizationId: invoice.organizationId,
				portfolioId: invoice.portfolioId,
			},
		});

		// prepare to catch response
		const responsePromise = page.waitForResponse(url);

		await page.goto(url);

		// check that response is not ok
		const response = await responsePromise;
		expect.soft(response.status()).toBe(500);

		// the cookie should still be cleared since it has not led to a valid role
		expect(
			await getCookie({
				context: page.context(),
				cookieName: Cookie.role,
			}),
		).toBeUndefined();
	});
});
