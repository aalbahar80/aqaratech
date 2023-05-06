/* eslint-disable @typescript-eslint/no-empty-function */
import { expect } from '@playwright/test';

import { getRoute, PageTab } from '@self/utils';

import { prisma } from '../../prisma';
import { test } from '../api/api-fixtures';

test.use({ invoicesParams: [{ isPaid: false }] });

const email1 = 'test-1@aqtest.com';
const email2 = 'test-2@aqtest.com';
const emails = [email1, email2];

test.beforeAll(() => {
	// create users
	emails.forEach((email) => {
		prisma.user
			.create({
				data: { email, fullName: 'test' },
			})
			.catch(() => {});
	});
});

test.skip('invoice due email', async ({ page, tenant, invoice }) => {
	// ensure tenant has an email
	emails.forEach((email) => {
		prisma.role
			.create({
				data: {
					roleType: 'TENANT',
					organization: { connect: { id: invoice.organizationId } },
					tenant: { connect: { id: tenant.id } },
					user: { connect: { email } },
				},
			})
			.catch(() => {});
	});

	const url = getRoute({
		entity: 'leaseInvoice',
		id: invoice.id,
		pageType: PageTab.Messages,
		params: {
			organizationId: invoice.organizationId,
			portfolioId: invoice.portfolioId,
		},
	});

	await page.goto(url);

	const send = page.getByRole('button', { name: 'Send reminder' });

	const responsePromise = page.waitForResponse((res) =>
		res.url().includes('notify'),
	);

	await send.click();

	const response = await responsePromise;

	expect(response.status()).toBe(201);

	const body = (await response.json()) as string[];

	// check email was sent
	expect.soft(body).toHaveLength(2);
	expect.soft(body).toContain(email1);
	expect.soft(body).toContain(email2);
});
