import { expect } from '@playwright/test';

import { getRoute, PageTab } from '@self/utils';

import { prisma } from '../../../prisma';
import { test } from '../../api/api-fixtures';
import { Modal } from '../../models/modal';

const email = 'test@aqtest.com';

test.beforeAll(() => {
	prisma.user
		.create({
			data: { email, fullName: 'test' },
		})
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		.catch(() => {});
});

test.describe('can delete role', () => {
	test('org', async ({ page, org }) => {
		const role = await prisma.role.create({
			data: {
				roleType: 'ORGADMIN',
				organization: { connect: { id: org.organization.id } },
				user: { connect: { email } },
			},
		});

		const url = getRoute({
			entity: 'organization',
			id: org.organization.id,
			pageType: PageTab.Roles,
			params: {},
		});

		await page.goto(url);

		const responsePromise = page.waitForResponse(
			(res) => res.request().method() === 'DELETE',
		);

		// find the row with the test email
		const btn = page
			.getByRole('row')
			.filter({
				hasText: email,
			})
			.getByRole('button', { name: 'Delete' });

		await btn.click();

		const modal = new Modal({ page });
		await modal.deleteConfirm();

		await responsePromise;

		const deleted = await prisma.role.findUnique({ where: { id: role.id } });

		expect(deleted).toBeNull();
	});

	test('portfolio', async ({ page, org, portfolio }) => {
		const role = await prisma.role.create({
			data: {
				roleType: 'PORTFOLIO',
				organization: { connect: { id: org.organization.id } },
				portfolio: { connect: { id: portfolio.id } },
				user: { connect: { email } },
			},
		});

		const url = getRoute({
			entity: 'portfolio',
			id: portfolio.id,
			pageType: PageTab.Roles,
			params: { organizationId: org.organization.id },
		});

		await page.goto(url);

		const responsePromise = page.waitForResponse(
			(res) => res.request().method() === 'DELETE',
		);

		// find the row with the test email
		const btn = page
			.getByRole('row')
			.filter({
				hasText: email,
			})
			.getByRole('button', { name: 'Delete' });

		await btn.click();

		const modal = new Modal({ page });
		await modal.deleteConfirm();

		await responsePromise;

		const deleted = await prisma.role.findUnique({ where: { id: role.id } });

		expect(deleted).toBeNull();
	});

	test('tenant', async ({ page, org, tenant }) => {
		const role = await prisma.role.create({
			data: {
				roleType: 'TENANT',
				organization: { connect: { id: org.organization.id } },
				tenant: { connect: { id: tenant.id } },
				user: { connect: { email } },
			},
		});

		const url = getRoute({
			entity: 'tenant',
			id: tenant.id,
			pageType: PageTab.Roles,
			params: { organizationId: org.organization.id },
		});

		await page.goto(url);

		const responsePromise = page.waitForResponse(
			(res) => res.request().method() === 'DELETE',
		);

		// find the row with the test email
		const btn = page
			.getByRole('row')
			.filter({
				hasText: email,
			})
			.getByRole('button', { name: 'Delete' });

		await btn.click();

		const modal = new Modal({ page });
		await modal.deleteConfirm();

		await responsePromise;

		const deleted = await prisma.role.findUnique({ where: { id: role.id } });

		expect(deleted).toBeNull();
	});
});

test.describe('final admin role cannot be deleted', () => {
	test('form', async ({ page, org }) => {
		const roles = await prisma.role.findMany({
			where: {
				roleType: 'ORGADMIN',
				organizationId: org.organization.id,
			},
		});

		expect(roles).toHaveLength(1);

		const url = getRoute({
			entity: 'organization',
			id: org.organization.id,
			pageType: PageTab.Roles,
			params: {},
		});

		await page.goto(url);

		const responsePromise = page.waitForResponse(
			(res) => res.request().method() === 'DELETE',
		);

		// find the only row
		const btn = page.getByRole('row').getByRole('button', { name: 'Delete' });

		await btn.click();

		const modal = new Modal({ page });
		await modal.deleteConfirm();

		const toast = page.getByRole('status');

		const invalid = toast.getByText(
			'Deletion unsuccessful. Please ensure that the organization has at least one admin role before attempting to delete.',
		);
		await expect(invalid).toBeVisible();

		await responsePromise;

		const role = await prisma.role.findUnique({
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			where: { id: roles[0]!.id },
		});

		expect(role).not.toBeNull();
	});
});
