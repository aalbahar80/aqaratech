import { preselected } from '../utils.js';
import { getAddress, getName } from '../../src/lib/utils/common.js';
import { expect, test } from '../config/test-setup.js';

test.use({ storageState: './config/adminStorageState.json' });

test.describe(`New property form`, async () => {
	test.beforeEach(async ({ page, propertyForm }) => {
		await page.goto('/new/properties');
		// @ts-ignore
		await page.evaluate(() => window.started); // waits for hydration
		await propertyForm.fill();
	});

	test('returns a status of 200', async ({ propertyForm }) => {
		const request = await propertyForm.getRequest();
		const response = await request.response();
		expect(response?.status()).toBe(200);
	});

	test('redirects to property detail page', async ({ page, propertyForm }) => {
		await propertyForm.submit();

		const re = new RegExp(
			`/properties/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
		);
		await expect(page).toHaveURL(re);
	});

	test('some details are correct', async ({ propertyForm, page }) => {
		await propertyForm.submit();
		await page.waitForNavigation();

		const el = page.locator(`text=${propertyForm.data.area}`).first();
		const re = new RegExp(`${propertyForm.data.area}`);
		expect(await el.textContent()).toMatch(re);
	});
});

test.describe('Edit property form', async () => {
	test.beforeEach(async ({ page, propertyForm }) => {
		await page.goto(`/properties/${propertyForm.data.id}/edit`);
		// @ts-ignore
		await page.evaluate(() => window.started); // waits for hydration
	});

	test('client is preselected', async ({ propertyForm, page }) => {
		const el = page.locator('#clientId');
		await preselected(page, el, getName(propertyForm.client));
	});

	test('area is preselected', async ({ propertyForm, page }) => {
		const el = page.locator('.selection');
		const selected = await el.evaluate((el: HTMLDivElement) => el.innerText);
		expect(selected).toMatch(propertyForm.data.area);
	});
});

test('New property: preselected clientId from URL', async ({
	page,
	clientForm,
}) => {
	await page.goto(`/new/properties?clientId=${clientForm.id}`);
	// @ts-ignore
	await page.evaluate(() => window.started); // waits for hydration
	await preselected(page, page.locator('#clientId'), getName(clientForm.data));
});

test.describe('new unit', async () => {
	test.beforeEach(async ({ page, propertyForm }) => {
		await page.goto(`/new/units?propertyId=${propertyForm.id}`);
		// @ts-ignore
		await page.evaluate(() => window.started); // waits for hydration
	});

	test('preselected property from URL', async ({ page, propertyForm }) => {
		await preselected(
			page,
			page.locator('#propertyId'),
			getAddress(propertyForm.data),
		);
	});

	test('preselected client from URL', async ({ page, propertyForm }) => {
		await preselected(
			page,
			page.locator('#clientId'),
			getName(propertyForm.client),
		);
	});
});

test('new lease: preselected property from URL', async ({ page, unitForm }) => {
	await page.goto(`/new/leases?unitId=${unitForm.id}`);
	// @ts-ignore
	await page.evaluate(() => window.started); // waits for hydration
	await preselected(
		page,
		page.locator('#propertyId'),
		getAddress(unitForm.property),
	);
});

test('new lease: preselected unit from URL', async ({ page, unitForm }) => {
	await page.goto(`/new/leases?unitId=${unitForm.id}`);
	// @ts-ignore
	await page.evaluate(() => window.started); // waits for hydration
	await preselected(
		page,
		page.locator('#unitId'),
		[unitForm.data.type, unitForm.data.unitNumber]
			.filter((str) => str)
			.join(' '),
	);
});

test.fixme(
	'new lease: preselected tenant from URL',
	async ({ page, unitForm }) => {
		await page.goto(`/new/leases?unitId=${unitForm.id}`);
		// @ts-ignore
		await page.evaluate(() => window.started); // waits for hydration
		await preselected(
			page,
			page.locator('#unitId'),
			[unitForm.data.type, unitForm.data.unitNumber]
				.filter((str) => str)
				.join(' '),
		);
	},
);
