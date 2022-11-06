import { test as base } from '@playwright/test';
import {
	leaseFactory,
	organizationFactory,
	portfolioFactory,
	propertyFactory,
	tenantFactory,
	unitFactory,
} from '@self/seed';
import * as R from 'remeda';
import type {
	LeaseDto,
	OrganizationCreatedDto,
	PortfolioDto,
	PropertyDto,
	TenantDto,
	UnitDto,
} from '../../types/api';
import { apiURL } from './fixtures/api-url';
import { expenseCategoryFixtures } from './fixtures/expense-category.fixture';
import { expenseFixtures } from './fixtures/expense.fixture';
import { invoiceFixtures } from './fixtures/invoice-fixture';
import { roleFixtures } from './fixtures/role.fixture';
import { scopedRequestFixtures } from './fixtures/scoped-request.fixture';
import type {
	TestFixtures,
	TestOptions,
} from './fixtures/test-fixtures.interface';

// Extend basic test by providing an "org" fixture.
// `org` is a fresh organization. Role ID header is set in extraHTTPHeaders.
export const test = base.extend<TestFixtures & TestOptions>({
	// Dependency map: org -> request
	// 1. A new org is created
	// 3. The `request` fixture is overriden with the new page.request, which has the new role cookie set
	// 4. Any test that imports from this file will have access to the new org, and request

	// A fixture that returns a fresh organization.
	org: async ({ baseURL, context }, use) => {
		if (!baseURL) throw new Error('baseURL is not set');

		// baseURL is populated because it is set very early in playwright.config.ts
		// For some reason though, contextOptions.baseURL is not set.
		// P.S. We can't use extraHTTPHeaders here, because it'll cause a circular dependency.
		// contextOptions might be empty because this is executed before test.use is called?
		// For this reason, we create a new context here.

		const organization = R.pick(organizationFactory.build(), ['fullName']);

		const res = await context.request.post(`${apiURL}/organizations`, {
			data: organization,
		});

		const created = (await res.json()) as OrganizationCreatedDto;

		await use(created);
	},

	roleCookie: async ({ org, context }, use) => {
		const staleRoleCookie = (await context.cookies()).find(
			(cookie) => cookie.name === 'role',
		);

		if (!staleRoleCookie) throw new Error('role cookie is not set');

		const cookie = {
			...staleRoleCookie,
			value: org.roleId,
		};

		await context.addCookies([cookie]);

		await use(cookie);
	},

	// adds the new org's roleID to context's cookies
	request: async ({ context, roleCookie }, use) => {
		await context.addCookies([roleCookie]);

		await use(context.request);
	},

	// adds the new org's roleID to context's cookies
	page: async ({ context, roleCookie }, use) => {
		await context.addCookies([roleCookie]);

		const page = await context.newPage();

		// eslint-disable-next-line @typescript-eslint/unbound-method
		const goto = page.goto;

		page.goto = async function (url, opts) {
			const res = await goto.call(page, url, opts);

			// https://github.com/sveltejs/kit/pull/6484
			await page.waitForSelector('body.started', { timeout: 5000 });

			return res;
		};

		await use(page);
	},

	tenant: async ({ org, request }, use) => {
		// create fresh tenant
		const tenant = tenantFactory.build({
			organizationId: org.organization.id,
		});

		const picked = R.pick(tenant, ['fullName']);

		const url = `${apiURL}/organizations/${org.organization.id}/tenants`;
		const res = await request.post(url, { data: picked });

		const created = (await res.json()) as TenantDto;

		await use(created);
	},

	// A fixture that returns a fresh portfolio in a fresh organization.
	// Fixtures are "composable", i.e when a test uses both org and portfolio fixtures, the same organization is used.
	portfolio: async ({ org, request }, use) => {
		// create fresh portfolio
		const portfolio = portfolioFactory.build({
			organizationId: org.organization.id,
		});

		const picked = R.pick(portfolio, ['fullName']);

		const url = `${apiURL}/organizations/${org.organization.id}/portfolios`;

		const res = await request.post(url, { data: picked });

		const created = (await res.json()) as PortfolioDto;

		await use(created);
	},

	// A fixture that returns a fresh property in a fresh organization.
	property: async ({ portfolio, request }, use) => {
		// create fresh property
		const property = propertyFactory.build({
			organizationId: portfolio.organizationId,
			portfolioId: portfolio.id,
		});

		const picked = R.pick(property, [
			'portfolioId',
			'area',
			'block',
			'street',
			'number',
		]);

		const url = `${apiURL}/organizations/${portfolio.organizationId}/properties`;

		const res = await request.post(url, { data: picked });

		const created = (await res.json()) as PropertyDto;

		await use(created);
	},

	unit: async ({ org, property, request }, use) => {
		const unit = unitFactory.build({
			organizationId: org.organization.id,
			portfolioId: property.portfolioId,
			propertyId: property.id,
		});

		const picked = R.pick(unit, [
			'type',
			'unitNumber',
			'portfolioId',
			'propertyId',
		]);

		const url = `${apiURL}/organizations/${org.organization.id}/units`;

		const res = await request.post(url, { data: picked });

		const created = (await res.json()) as UnitDto;

		await use(created);
	},

	lease: async ({ org, unit, tenant, request }, use) => {
		const lease = leaseFactory.build({
			organizationId: org.organization.id,
			portfolioId: unit.portfolioId,
			unitId: unit.id,
			tenantId: tenant.id,
		});

		const picked = R.pick(lease, [
			'portfolioId',
			'unitId',
			'tenantId',
			'start',
			'end',
			'monthlyRent',
			'notify',
			'canPay',
		]);

		const url = `${apiURL}/organizations/${org.organization.id}/leases`;

		const res = await request.post(url, { data: picked });

		const created = (await res.json()) as LeaseDto;

		await use(created);
	},

	// A fixture that returns a fresh file in a fresh portfolio.
	file: async ({ portfolio, request }, use) => {
		const fileName = 'test.txt';

		const url = `${apiURL}/organizations/${portfolio.organizationId}/files`;
		const res = await request.post(url, {
			multipart: {
				fileName: fileName,
				relationKey: 'portfolio',
				relationValue: portfolio.id,
				organizationId: portfolio.organizationId,
				file: {
					name: fileName,
					mimeType: 'text/plain',
					buffer: Buffer.from('hello world'),
				},
			},
		});

		const name = await res.text();
		const key = `portfolio/${portfolio.id}/${name}`;

		await use(key);
	},

	...scopedRequestFixtures,
	...invoiceFixtures,
	...expenseFixtures,
	...expenseCategoryFixtures,
	...roleFixtures,
});
