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
	ExpenseCategoryDto,
	LeaseDto,
	OrganizationCreatedDto,
	PortfolioDto,
	PropertyDto,
	TenantDto,
	UnitDto,
} from '../types/api';

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

		const res = await context.request.post(`/organizations`, {
			data: organization,
		});

		const created = (await res.json()) as OrganizationCreatedDto;

		await use(created);
	},

	// Takes a role ID and returns a new request with the role cookie set.
	withRoleId: [undefined, { option: true }],

	request: async ({ org, context, withRoleId }, use) => {
		let setRoleCookieAs = undefined;

		if (withRoleId) {
			setRoleCookieAs = withRoleId;
		} else {
			setRoleCookieAs = org.roleId;
		}

		const roleCookie = (await context.cookies()).find(
			(cookie) => cookie.name === 'role',
		);

		if (!roleCookie) throw new Error('role cookie is not set');

		const newRoleCookie = {
			...roleCookie,
			value: setRoleCookieAs,
		};

		await context.addCookies([newRoleCookie]);

		await use(context.request);
	},

	tenant: async ({ org, request }, use) => {
		// create fresh tenant
		const tenant = tenantFactory.build({
			organizationId: org.organization.id,
		});

		const picked = R.pick(tenant, ['fullName', 'organizationId']);

		const res = await request.post(`/tenants`, { data: picked });

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

		const picked = R.pick(portfolio, ['fullName', 'organizationId']);

		const res = await request.post(`/portfolios`, { data: picked });

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
			'area',
			'number',
			'organizationId',
			'portfolioId',
		]);

		const res = await request.post(`/properties`, { data: picked });

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
			'organizationId',
			'portfolioId',
			'propertyId',
		]);

		const res = await request.post(`/units`, { data: picked });

		const created = (await res.json()) as UnitDto;

		await use(created);
	},

	lease: async ({ org, unit, tenant, request }, use) => {
		const lease = leaseFactory.build({
			organizationId: org.organization.id,
			portfolioId: unit.portfolioId,
			unitId: unit.id,
			tenantId: tenant.id,
			start: '2021-01-01',
		});

		const picked = R.pick(lease, [
			'start',
			'end',
			'monthlyRent',
			'deposit',
			'organizationId',
			'portfolioId',
			'unitId',
			'tenantId',
		]);

		const res = await request.post(`/leases`, { data: picked });

		const created = (await res.json()) as LeaseDto;

		await use(created);
	},

	// A fixture that returns a fresh file in a fresh portfolio.
	file: async ({ portfolio, request }, use) => {
		const fileName = 'test.txt';

		const res = await request.post(`/files`, {
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

	expenseCategory: async ({ request }, use) => {
		const res = await request.get(`/expense-categories`);

		const categories = (await res.json()) as ExpenseCategoryDto[];

		const category = categories.find((c) => !c.isGroup);

		if (!category) throw new Error('No expense category found');

		await use(category);
	},
});

interface TestFixtures {
	org: OrganizationCreatedDto;
	tenant: TenantDto;
	portfolio: PortfolioDto;
	property: PropertyDto;
	unit: UnitDto;
	lease: LeaseDto;
	file: string;
	expenseCategory: ExpenseCategoryDto;
}

interface TestOptions {
	withRoleId: string | undefined;
}
