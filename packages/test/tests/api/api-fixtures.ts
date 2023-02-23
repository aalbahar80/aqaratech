import { randomUUID } from 'crypto';

import { test as base } from '@playwright/test';
import tier from 'tier';

import {
	organizationFactory,
	portfolioFactory,
	testOrgEmail,
} from '@self/seed';
import { Cookie, generateExpenseCategoryTree, tierid } from '@self/utils';

import { prisma } from '../../prisma';
import { createBucketDev } from '../../utils/create-bucket';
import { createRole } from '../../utils/create-role';
import { resCheck } from '../../utils/res-check';

import { apiURL } from './fixtures/api-url';
import { plan } from './fixtures/env';
import { expenseCategoryFixtures } from './fixtures/expense-category.fixture';
import { expenseFixtures } from './fixtures/expense.fixture';
import { invoiceFixtures } from './fixtures/invoice-fixture';
import { leaseFixtures } from './fixtures/lease.fixture';
import { maintenanceOrderFixtures } from './fixtures/maintenance-order.fixture';
import { payoutFixtures } from './fixtures/payout.fixture';
import { portfolioFixtures } from './fixtures/portfolio.fixture';
import { propertyFixtures } from './fixtures/property.fixture';
import { roleFixtures } from './fixtures/role.fixture';
import { tenantFixtures } from './fixtures/tenant.fixture';
import { unitFixtures } from './fixtures/unit.fixture';

import type {
	PWCookie,
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
	organizationParams: [undefined, { option: true }],
	org: [
		async ({ createBucket, organizationParams }, use) => {
			const organization = organizationFactory.build(organizationParams);

			// only subscribes if the test fixture has `isActive: true`,
			// not whether the factory has `isActive: true`
			if (organizationParams?.isActive) {
				await tier.subscribe(tierid(organization.id), plan, {
					info: {
						name: organization.fullName,
						email: testOrgEmail,
						phone: '',
						description: '',
						metadata: {},
					},
				});
			}

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

	userRoleType: ['ORGADMIN', { option: true }],

	roleCookie: async (
		{ baseURL, org, portfolio, tenant, userRoleType, storageState },
		use,
	) => {
		let optOut: boolean;

		if (!storageState) {
			optOut = true;
		} else if (typeof storageState === 'string') {
			optOut = storageState.length === 0;
		} else {
			optOut = storageState.cookies.length === 0;
		}

		if (optOut) {
			await use(null);
		} else {
			const baseCookie: Omit<PWCookie, 'name' | 'value'> = {
				path: '/',
				domain: baseURL ? new URL(baseURL).host : 'localhost',
				expires: Date.now() / 1000 + 86400, // expires tomorrow
				// expires: -1,
				httpOnly: true,
				secure: false,
				sameSite: 'Lax',
			};

			let roleId;

			if (userRoleType === 'TENANT') {
				const role = await createRole({
					roleType: 'TENANT',
					tenantId: tenant.id,
					organizationId: org.organization.id,
					email: testOrgEmail,
				});
				roleId = role.id;
			} else if (userRoleType === 'PORTFOLIO') {
				const role = await createRole({
					roleType: 'PORTFOLIO',
					portfolioId: portfolio.id,
					organizationId: org.organization.id,
					email: testOrgEmail,
				});
				roleId = role.id;
			} else {
				roleId = org.roleId;
			}

			const cookie = {
				...baseCookie,
				value: roleId,
				name: Cookie.role,
			};

			await use(cookie);
		}
	},

	// adds the new org's roleID to context's cookies
	request: async ({ context, roleCookie }, use) => {
		if (roleCookie) {
			await context.addCookies([roleCookie]);
		}

		await use(context.request);
	},

	// adds the new org's roleID to context's cookies
	page: async ({ context, roleCookie, waitForHydration }, use) => {
		if (roleCookie) {
			await context.addCookies([roleCookie]);
		}

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
