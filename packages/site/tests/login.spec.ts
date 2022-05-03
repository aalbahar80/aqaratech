import { test, expect } from '@playwright/test';

const users = [
	{
		role: 'admin',
		email: 'admin.dev@mailthink.net',
		password: 'test12',
		destination: '/',
	},
	{
		role: 'owner',
		email: 'client.dev@mailthink.net',
		password: 'test12',
		destination: /^http:\/\/localhost:3000\/clients\/.+\/dashboard$/,
	},
	{
		role: 'tenant',
		email: 'tenant.dev@mailthink.net',
		password: 'test12',
		destination: /^http:\/\/localhost:3000\/portal\/tenant\/.*$/,
	},
];

// Explicitly set storageState to undefined to avoid reused auth state.
test.use({ storageState: undefined });

for (const user of users) {
	test.describe(`${user.role} login:`, async () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/');
			await page.locator('text=Log In >> visible=true').click();

			await page.fill('input[name="username"]', user.email);
			await page.fill('input[name="password"]', user.password);
			await page.locator('button[name="action"]').click();
		});

		test(`${user.role} redirected to correct url`, async ({ page }) => {
			await page.waitForNavigation();
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
