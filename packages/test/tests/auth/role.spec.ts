import { expect } from '@playwright/test';

import { testOrgEmail } from '@self/seed';
import { Cookie, PageType, getRoute } from '@self/utils';

import { getCookie } from '../../utils/get-cookie';
import { test } from '../api/api-fixtures';

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

test('role is resolved correctly', async ({
	page: originalPage,
	invoice,
	org,
}) => {
	// - user has multiple roles, both in same org and different orgs
	// - user has no role cookie set (simulating new login)
	// - check that the role is resolved to one with same orgId
	// - check that the role is resolved to one with higher priority

	// create new context avoid interfering with interfering with other tests
	// const context = await browser.newContext();
	const context = await originalPage.context().browser()?.newContext();
	if (!context) throw new Error('Context is undefined');

	const page = await context.newPage();

	// clear the role cookie only
	const cookies = await page.context().cookies();

	const withoutRoleCookie = cookies.filter(
		(cookie) => cookie.name !== Cookie.role,
	);

	await page.context().clearCookies();
	await page.context().addCookies(withoutRoleCookie);

	// assert that the role cookie is cleared
	expect(
		await getCookie({
			context: page.context(),
			cookieName: Cookie.role,
		}),
	).toBeUndefined();

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

	// check that the role is resolved to one with same orgId
	const roleCookie = await getCookie({
		context: page.context(),
		cookieName: Cookie.role,
	});

	expect.soft(roleCookie).toMatchObject({
		value: org.roleId,
	});

	await context.close();
});
