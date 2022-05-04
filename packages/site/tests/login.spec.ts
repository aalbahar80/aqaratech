import { expect, test } from '@playwright/test';
import {
	fakeClient,
	fakeTenant,
	testClientId,
	testTenantId,
} from '../../seed/generators.js';
import prisma from './config/prismaClient.js';

const users = [
	{
		role: 'admin',
		email: 'admin.dev@mailthink.net',
		password: 'test12',
		destination: '/',
	},
	{
		role: 'owner',
		id: testClientId,
		data: {
			...fakeClient(),
			id: testClientId,
		},
		email: 'client.dev@mailthink.net',
		password: 'test12',
		// destination: /^http:\/\/localhost:3000\/clients\/.+\/dashboard$/,
		destination: `/clients/${testClientId}/dashboard`,
	},
	{
		role: 'tenant',
		id: testTenantId,
		data: {
			...fakeTenant(),
			id: testTenantId,
		},
		email: 'tenant.dev@mailthink.net',
		password: 'test12',
		destination: `/portal/tenant/${testTenantId}`,
	},
] as const;

// Explicitly set storageState to undefined to avoid reused auth state.
// test.use({ storageState: undefined });

for (const user of users) {
	test.describe(`${user.role} login:`, async () => {
		test.beforeAll(async () => {
			// A determined id is used to avoid creating an actual account on auth0.
			if (user.role === 'tenant') {
				await prisma.tenant.create({
					data: user.data,
				});
			} else if (user.role === 'owner') {
				await prisma.client.create({
					data: user.data,
				});
			}
		});
		test.beforeEach(async ({ page }) => {
			await page.goto('/');
			await page.locator('text=Log In >> visible=true').click();

			await page.fill('input[name="username"]', user.email);
			await page.fill('input[name="password"]', user.password);
			await page.locator('button[name="action"]').click();
		});

		test(`redirected to correct url`, async ({ page }) => {
			await page.waitForNavigation({
				waitUntil: 'networkidle',
				timeout: 10000,
			});
			await expect(page).toHaveURL(user.destination);
		});

		test('accessToken exists', async ({ context }) => {
			const cookies = await context.cookies();
			const accessToken = cookies.find((c) => c.name === 'accessToken');
			expect(accessToken).toMatchObject({
				name: 'accessToken',
				value: expect.stringMatching(
					/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/,
				),
				domain: 'localhost',
				path: '/',
				expires: expect.any(Number),
				httpOnly: true,
				secure: true,
			});
		});

		test('idToken exists', async ({ context }) => {
			const cookies = await context.cookies();
			const idToken = cookies.find((c) => c.name === 'idToken');
			expect(idToken).toMatchObject({
				name: 'idToken',
				value: expect.stringMatching(
					/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/,
				),
				domain: 'localhost',
				path: '/',
				expires: expect.any(Number),
				httpOnly: true,
				secure: true,
			});
		});
	});
}
