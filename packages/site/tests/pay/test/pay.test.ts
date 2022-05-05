import { expect, test } from '@playwright/test';
import { randomUUID } from 'crypto';
import {
	fakeClient,
	fakeLease,
	fakeProperty,
	fakeTenant,
	fakeTransactionBasic,
	fakeUnit,
	testTenantId,
} from '../../../../seed/generators.js';
import prisma from '../../config/prismaClient.js';
import { cleanupDatabase } from '../../utils.js';

const email = 'tenant.dev@mailthink.net';
const password = 'test12';

test('tenant can pay', async ({ page }) => {
	await cleanupDatabase();
	const trx = fakeTransactionBasic();
	const { clientId: _c, ...property } = fakeProperty();
	const { propertyId: _p, ...unit } = fakeUnit();

	// Setup
	await prisma.client.create({
		data: {
			...fakeClient(),
			properties: {
				connectOrCreate: [
					{
						where: {
							id: property.id,
						},
						create: {
							...property,
							units: {
								connectOrCreate: [
									{
										where: {
											id: unit.id,
										},
										create: {
											...unit,
										},
									},
								],
							},
						},
					},
				],
			},
		},
		include: {
			properties: {
				include: {
					units: true,
				},
			},
		},
	});

	const {
		tenantId: _,
		unitId: __,
		...lease
	} = fakeLease(testTenantId, randomUUID(), new Date());
	await prisma.tenant.create({
		data: {
			...fakeTenant(),
			email,
			id: testTenantId,
			leases: {
				create: {
					...lease,
					transactions: {
						create: {
							...trx,
							// ...fakeTransactionBasic(),
						},
					},
					unit: {
						connect: {
							id: unit.id,
						},
					},
				},
			},
		},
	});

	// Login
	await page.goto('/');
	await page.locator('text=Log In >> visible=true').click();

	await page.fill('input[name="username"]', email);
	await page.fill('input[name="password"]', password);
	await page.locator('button[name="action"]').click();

	// TODO: replace with proper hydration check
	await page.goto(`/portal/tenant/${testTenantId}`);
	await page.click('text=Pay');

	// Pay
	await Promise.all([
		page.waitForNavigation(),
		page.locator('text=Pay').click(),
	]);
	await page
		.locator(
			'text=Select Your Bank: Select Your Bank Ahli United Bank [AUB] Al Ahli Bank of Kuwait >> select',
		)
		.selectOption('201825717889145|Knet Test Card [KNET1]|0.000');
	await page.locator('input[name="debitNumber"]').fill('0000000001');
	await page.locator('select').nth(2).selectOption('9');
	await page.locator('select').nth(3).selectOption('2025');
	await page.locator('input[name="cardPin"]').fill('1111');
	await page.locator('text=Submit').click();
	await page.locator('input:has-text("Confirm")').click();
	const trxList = page.locator('ul#trxList');
	await expect.soft(trxList).toBeVisible();

	// Confirm
	const card = page.locator(`id=${trx.id}`);
	await expect.soft(card).toBeVisible();
	await expect.soft(card).toHaveClass(/isPaid/);
	await expect.soft(card).not.toContainText(/Pay/i);
});
