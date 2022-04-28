import { ClientForm, PropertyForm } from './form';
import { expect, test } from '../config/test-setup.js';

test.use({
	// defaultForm: ClientForm,
	defaultForm: async ({}, use) => {
		// Read locale from some configuration file.
		// const locale = await fs.promises.readFile('test-locale', 'utf-8');
		// await use(ClientForm);
		await use(PropertyForm);
	},
});

test('use formOption', async ({ formOption, page }) => {
	// const form = new formOption(page);
	// await form.setup(trpcClient);
	// await use(form);
	// await form.clean(trpcClient);
	// await page.goto('/new/clients');
	await page.goto(formOption.getUrl('new'));
	// @ts-ignore
	await page.evaluate(() => window.started); // waits for hydration
	await formOption.fill();
	const request = await formOption.getRequest();
	const response = await request.response();
	expect(response?.status()).toBe(200);
});

test.describe(`New client form`, async () => {
	test.beforeEach(async ({ page, clientForm }) => {
		await page.goto('/new/clients');
		// @ts-ignore
		await page.evaluate(() => window.started); // waits for hydration
		await clientForm.fill();
	});

	test('returns a status of 200', async ({ clientForm }) => {
		const request = await clientForm.getRequest();
		const response = await request.response();
		expect(response?.status()).toBe(200);
	});

	test('redirects to client detail page', async ({ page, clientForm }) => {
		await clientForm.submit();

		const re = new RegExp(
			`/clients/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
		);
		await expect(page).toHaveURL(re);
	});

	test('some details are correct', async ({ clientForm, page }) => {
		await clientForm.submit();
		await page.waitForNavigation();

		const el = page.locator(`text=${clientForm.data.firstName}`);
		const re = new RegExp(
			`${clientForm.data.firstName} ${clientForm.data.lastName}`,
		);
		expect(await el.textContent()).toMatch(re);

		const el2 = page.locator(`"${clientForm.data.email}"`);
		expect(await el2.innerText()).toBe(clientForm.data.email);
	});
});

test.describe('Edit client form', async () => {
	test.beforeEach(async ({ page, clientForm }) => {
		await page.goto(`/clients/${clientForm.data.id}/edit`);
		// @ts-ignore
		await page.evaluate(() => window.started); // waits for hydration
	});

	test('returns a 200 response', async ({ clientForm }) => {
		clientForm.alter();
		await clientForm.fill();
		const request = await clientForm.getRequest();
		const response = await request.response();
		expect(response?.status()).toBe(200);
	});

	test('redirects to client detail page', async ({ page, clientForm }) => {
		await clientForm.submit();
		await page.waitForNavigation();
		await expect(page).toHaveURL(`/clients/${clientForm.data.id}`);
	});

	test('some details are correct', async ({ clientForm, page }) => {
		await clientForm.submit();
		await page.waitForNavigation();

		const el = page.locator(`text=${clientForm.data.firstName}`);
		const re = new RegExp(
			`${clientForm.data.firstName} ${clientForm.data.lastName}`,
		);
		expect(await el.textContent()).toMatch(re);

		const el2 = page.locator(`"${clientForm.data.email}"`);
		expect(await el2.innerText()).toBe(clientForm.data.email);
	});
});
