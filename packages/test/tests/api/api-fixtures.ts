import { randomUUID } from 'crypto';

import { test as base } from '@playwright/test';
import * as R from 'remeda';

import {
	organizationFactory,
	portfolioFactory,
	testOrgEmail,
} from '@self/seed';
import { Cookie, generateExpenseCategoryTree } from '@self/utils';

import { prisma } from '../../prisma';
import { createBucketDev } from '../../utils/create-bucket';
import { getCookie } from '../../utils/get-cookie';
import { resCheck } from '../../utils/res-check';

import { apiURL } from './fixtures/api-url';
import { expenseCategoryFixtures } from './fixtures/expense-category.fixture';
import { expenseFixtures } from './fixtures/expense.fixture';
import { invoiceFixtures } from './fixtures/invoice-fixture';
import { leaseFixtures } from './fixtures/lease.fixture';
import { maintenanceOrderFixtures } from './fixtures/maintenance-order.fixture';
import { payoutFixtures } from './fixtures/payout.fixture';
import { portfolioFixtures } from './fixtures/portfolio.fixture';
import { propertyFixtures } from './fixtures/property.fixture';
import { roleFixtures } from './fixtures/role.fixture';
import { scopedRequestFixtures } from './fixtures/scoped-request.fixture';
import { tenantFixtures } from './fixtures/tenant.fixture';
import { unitFixtures } from './fixtures/unit.fixture';

import type {
	TestFixtures,
	TestOptions,
} from './fixtures/test-fixtures.interface';
import type { OrganizationCreatedDto } from '../../types/api';

// Extend basic test by providing an "org" fixture.
// `org` is a fresh organization. Role ID header is set in extraHTTPHeaders.
export const test = base.extend<TestFixtures & TestOptions>({
	waitForHydration: [true, { option: true }],

	// Dependency map: org -> request
	// 1. A new org is created
	// 3. The `request` fixture is overriden with the new page.request, which has the new role cookie set
	// 4. Any test that imports from this file will have access to the new org, and request

	// A fixture that returns a fresh organization.
	org: [
		async ({ createBucket }, use) => {
			const organization = R.pick(organizationFactory.build(), ['fullName']);

			const created = await prisma.organization.create({
				data: {
					...organization,
					organizationSettings: {
						create: {
							expenseCategoryTree: generateExpenseCategoryTree(randomUUID),
						},
					},
					roles: {
						create: {
							roleType: 'ORGADMIN',
							user: { connect: { email: testOrgEmail } },
						},
					},
				},
				include: {
					roles: true,
				},
			});

			const org = {
				organization: {
					...created,
					title: created.fullName,
				},
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				roleId: created.roles[0]!.id,
			} satisfies OrganizationCreatedDto;

			if (createBucket) {
				await createBucketDev(org.organization.id, process.env);
			}

			await use(org);
		},
		{
			scope: 'test',
		},
	],

	roleCookie: async ({ org, context }, use) => {
		const staleRoleCookie = await getCookie({
			context,
			cookieName: Cookie.role,
		});

		if (!staleRoleCookie) throw new Error('role cookie is not set');

		const cookie = {
			...staleRoleCookie,
			value: org.roleId,
			name: Cookie.role,
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
	page: async ({ context, roleCookie, waitForHydration }, use) => {
		await context.addCookies([roleCookie]);

		const page = await context.newPage();

		if (waitForHydration) {
			// eslint-disable-next-line @typescript-eslint/unbound-method
			const goto = page.goto;

			page.goto = async function (url, opts) {
				const res = await goto.call(page, url, opts);

				// https://github.com/sveltejs/kit/pull/6484
				await page.waitForSelector('body.started', { timeout: 5000 });

				return res;
			};
		}

		await use(page);
	},

	// A fixture that returns a fresh portfolio in a fresh organization.
	// Fixtures are "composable", i.e when a test uses both org and portfolio fixtures, the same organization is used.
	portfolio: [
		async ({ org }, use) => {
			const data = portfolioFactory.build({
				organizationId: org.organization.id,
			});

			const portfolio = await prisma.portfolio.create({
				data: {
					fullName: data.fullName,
					organization: { connect: { id: org.organization.id } },
				},
			});

			await use(portfolio);
		},
		{
			scope: 'test',
		},
	],

	createBucket: [false, { option: true }],

	// A fixture that returns a fresh file in a fresh portfolio.
	file: async ({ portfolio, request }, use) => {
		const fileName = 'test.txt';

		const url = `${apiURL}/organizations/${portfolio.organizationId}/files`;
		const req = request.post(url, {
			multipart: {
				fileName: fileName,
				relationKey: 'portfolio',
				relationValue: portfolio.id,
				file: {
					name: fileName,
					mimeType: 'text/plain',
					buffer: Buffer.from('hello world'),
				},
			},
		});

		const res = await req;
		resCheck(res);

		const name = await res.text();
		const key = `portfolio/${portfolio.id}/${name}`;

		await use(key);
	},

	...scopedRequestFixtures,
	...tenantFixtures,
	...portfolioFixtures,
	...leaseFixtures,
	...propertyFixtures,
	...unitFixtures,
	...invoiceFixtures,
	...expenseFixtures,
	...expenseCategoryFixtures,
	...payoutFixtures,
	...roleFixtures,
	...maintenanceOrderFixtures,
});
