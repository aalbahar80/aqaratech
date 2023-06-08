import path from 'path';

import { expect } from '@playwright/test';

import { PageTypePortfolio, getRoute } from '@self/utils';

import { getLoginButton } from '../../locators/common';
import { prisma } from '../../prisma';
import { globalStoragePath } from '../../utils/global-storage-path';
import { test } from '../api/api-fixtures';
import { siteURL } from '../api/fixtures/site-url';
import { testUsers } from '../api/fixtures/users/test-users';
import { SidebarModel } from '../components/sidebar/sidebar-model';

import type { ClaimRolesResponse, VerificationResponse } from '../../types/api';

// "New user" is a user that is logging in for the first time.

const email = testUsers.freshUser.email;
const file = testUsers.freshUser.storageStateFilename;
const storagePath = path.join(globalStoragePath, file);

test.use({ storageState: storagePath });

const contactOrg = 'Please contact your';

test.describe('new user', () => {
	test.beforeEach(async () => {
		// Clear the user from the database before each test.
		await prisma.role.deleteMany({ where: { user: { email } } });
		await prisma.user.deleteMany({ where: { email } });
	});

	test('is redirected to /welcome if no role', async ({ page, isMobile }) => {
		await page.goto('/');

		const loginButton = await getLoginButton(page, isMobile);
		await loginButton.click();

		await expect(page).toHaveURL('/en/welcome');

		await expect(page.getByText('Choose a role')).toBeVisible();
	});

	test('is redirected to /welcome if no role (signup button)', async ({
		page,
	}) => {
		await page.goto('/');

		await page
			.getByTestId('hero')
			.getByRole('link', { name: 'Sign up' })
			.click();

		await expect(page).toHaveURL('/en/welcome');
	});

	test('no role - tenant - prompted to contact org', async ({ page }) => {
		await page.goto('/en/welcome');

		await page.getByRole('link', { name: 'Customer' }).click();

		await expect(page).toHaveURL('/en/contact-org?claim-roles=1');
		await expect(page.getByText(contactOrg)).toBeVisible();
	});

	test('no role - tenant - redirected after number verification - phone number on file', async ({
		page,
	}) => {
		await page.goto('/en/welcome');

		await page.getByRole('link', { name: 'Customer' }).click();
		await page.getByTestId('claim-roles').click();
		await page.getByRole('link', { name: 'Verify Phone' }).click();
		await page.getByLabel('Phone').fill('12345678');
		await page.getByRole('button', { name: 'Get Code' }).click();

		await page.getByLabel('Code').fill('123456');

		// mock server response to indicate 1 role was claimed
		await page.route('**/phone-verify/confirm', async (route) => {
			return await route.fulfill({
				json: {
					success: true,
					message: 'Phone number verified',
				} satisfies VerificationResponse,
			});
		});

		await page.route('**/phone-verify/claim-roles', async (route) => {
			return await route.fulfill({
				json: {
					success: true,
					message: 'Roles claimed',
					roleCount: 1,
				} satisfies ClaimRolesResponse,
			});
		});

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(page).toHaveURL(/\/en\/users\/[a-z\d-]{36}\/claim-roles/);

		// click claim button (force)
		const claim = page.getByRole('button', { name: 'Claim roles' });
		await claim.evaluate((el) => el.removeAttribute('disabled'));
		await claim.click();

		// expect to be on the user's roles page (**/users/:uuid/roles)
		await expect(page).toHaveURL(/\/en\/users\/[a-z\d-]{36}\/roles/);
	});

	test('no role - tenant - redirected after number verification - no phone on file', async ({
		page,
	}) => {
		await page.goto('/en/welcome');

		await page.getByRole('link', { name: 'Customer' }).click();
		await page.getByTestId('claim-roles').click();
		await page.getByRole('link', { name: 'Verify Phone' }).click();
		await page.getByLabel('Phone').fill('12345678');
		await page.getByRole('button', { name: 'Get Code' }).click();

		await page.getByLabel('Code').fill('123456');

		// mock server response to indicate 1 role was claimed
		await page.route('**/phone-verify/confirm', async (route) => {
			return await route.fulfill({
				json: {
					success: true,
					message: 'Phone number verified',
				} satisfies VerificationResponse,
			});
		});

		await page.route('**/phone-verify/claim-roles', async (route) => {
			return await route.fulfill({
				json: {
					success: true,
					message: 'Roles claimed',
					roleCount: 0,
				} satisfies ClaimRolesResponse,
			});
		});

		await page.getByRole('button', { name: 'Submit' }).click();

		await expect(page).toHaveURL(/\/en\/users\/[a-z\d-]{36}\/claim-roles/);

		// click claim button (force)
		const claim = page.getByRole('button', { name: 'Claim roles' });
		await claim.evaluate((el) => el.removeAttribute('disabled'));
		await claim.click();

		// expect to be back on the contact-org page
		await expect(page).toHaveURL('/en/contact-org');
		await expect(page.getByText(contactOrg)).toBeVisible();
	});

	test('no role - portfolio - prompted to contact org', async ({ page }) => {
		await page.goto('/en/welcome');

		await page.getByRole('link', { name: 'Owner' }).click();

		await expect(page).toHaveURL('/en/contact-org');
		await expect(page.getByText(contactOrg)).toBeVisible();
	});

	test('no role - organization - prompted to contact org', async ({ page }) => {
		await page.goto('/en/welcome');

		await page.getByRole('link', { name: 'Organization', exact: true }).click();

		await expect(page).toHaveURL('/en/organizations/new');
	});

	test('no role - can get to welcome page from sidebar', async ({
		page,
		isMobile,
	}) => {
		await page.goto('/en/organizations/new');

		if (isMobile) {
			const sidebar = new SidebarModel(page);
			await sidebar.open();
		}
		await page.getByRole('link', { name: 'Start' }).click();

		await expect(page).toHaveURL('/en/welcome');
	});

	test('is redirected to portfolio portal if portolio', async ({
		page,
		portfolio,
		isMobile,
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

		const loginButton = await getLoginButton(page, isMobile);
		await loginButton.click();

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

	test('is redirected to tenant portal if tenant', async ({
		page,
		tenant,
		isMobile,
	}) => {
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

		const loginButton = await getLoginButton(page, isMobile);
		await loginButton.click();

		const url = `${siteURL}/en/portal/tenant/${tenant.id}/leaseInvoices`;

		await expect(page).toHaveURL(url);
	});
});
