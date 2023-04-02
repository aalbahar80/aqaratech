import path from 'path';

import { expect } from '@playwright/test';

import { PageTypePortfolio, getRoute } from '@self/utils';

import { prisma } from '../../prisma';
import { globalStoragePath } from '../../utils/global-storage-path';
import { test } from '../api/api-fixtures';
import { siteURL } from '../api/fixtures/site-url';
import { testUsers } from '../api/fixtures/users/test-users';

// "New user" is a user that is logging in for the first time.

const email = testUsers.freshUser.email;
const file = testUsers.freshUser.storageStateFilename;
const storagePath = path.join(globalStoragePath, file);

test.use({ storageState: storagePath });

test.describe('new user', () => {
	test.beforeEach(async () => {
		// Clear the user from the database before each test.
		await prisma.role.deleteMany({ where: { user: { email } } });
		await prisma.user.deleteMany({ where: { email } });
	});

	test('is redirected to /welcome if no role', async ({ page }) => {
		await page.goto('/');

		await page
			.getByRole('banner', { name: 'Global' })
			.getByRole('link', { name: 'Log in' })
			.click();

		await expect(page).toHaveURL('/en/welcome');
	});

	test('is redirected to /welcome if no role (hero)', async ({ page }) => {
		await page.goto('/');

		await page
			.getByTestId('hero')
			.getByRole('link', { name: 'Sign up' })
			.click();

		await expect(page).toHaveURL('/en/welcome');
	});

	test('is redirected to portfolio portal if portolio', async ({
		page,
		portfolio,
	}) => {
		// simulate that the user has been invited as a portfolio
		await prisma.role.create({
			data: {
				user: { create: { email } },
				portfolio: { connect: { id: portfolio.id } },
				roleType: 'PORTFOLIO',
				organization: { connect: { id: portfolio.organizationId } },
			},
		});

		await page.goto('/');
		await page.getByRole('link', { name: 'Log in' }).click();

		const url = getRoute({
			entity: 'portfolio',
			id: portfolio.id,
			pageType: PageTypePortfolio.Summary,
			params: {
				organizationId: portfolio.organizationId,
			},
		});

		await expect(page).toHaveURL(`${siteURL}${url}`);
	});

	test('is redirected to tenant portal if tenant', async ({ page, tenant }) => {
		// simulate that the user has been invited as a tenant
		await prisma.role.create({
			data: {
				user: { create: { email } },
				tenant: { connect: { id: tenant.id } },
				roleType: 'TENANT',
				organization: { connect: { id: tenant.organizationId } },
			},
		});

		await page.goto('/');
		await page.getByRole('link', { name: 'Log in' }).click();

		const url = `${siteURL}/en/portal/tenant/${tenant.id}/leaseInvoices`;

		await expect(page).toHaveURL(url);
	});
});
