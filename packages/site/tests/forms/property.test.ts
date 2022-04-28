import { preselected } from '../utils.js';
import { getAddress, getName } from '../../src/lib/utils/common.js';
import { expect, test } from '../config/test-setup.js';

test.use({ storageState: './config/adminStorageState.json' });
test.describe('Edit property form', async () => {
	test.beforeEach(async ({ page, propertyForm }) => {
		await page.goto(`/properties/${propertyForm.data.id}/edit`);
		await page.evaluate(() => window.started);
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
	await page.evaluate(() => window.started);
	await preselected(page, page.locator('#clientId'), getName(clientForm.data));
});

test.describe('new unit', async () => {
	test.beforeEach(async ({ page, propertyForm }) => {
		await page.goto(`/new/units?propertyId=${propertyForm.id}`);
		await page.evaluate(() => window.started);
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
	await page.evaluate(() => window.started);
	await preselected(
		page,
		page.locator('#propertyId'),
		getAddress(unitForm.property),
	);
});

test('new lease: preselected unit from URL', async ({ page, unitForm }) => {
	await page.goto(`/new/leases?unitId=${unitForm.id}`);
	await page.evaluate(() => window.started);
	await preselected(
		page,
		page.locator('#unitId'),
		[unitForm.data.type, unitForm.data.unitNumber]
			.filter((str) => str)
			.join(' '),
	);
});

test('new lease: preselected tenant from URL', async ({ page, unitForm }) => {
	await page.goto(`/new/leases?unitId=${unitForm.id}`);
	await page.evaluate(() => window.started);
	await preselected(
		page,
		page.locator('#unitId'),
		[unitForm.data.type, unitForm.data.unitNumber]
			.filter((str) => str)
			.join(' '),
	);
});

test.describe('edit lease', async () => {
	test.beforeEach(async ({ page, leaseForm }) => {
		await page.goto(`/leases/${leaseForm.id}/edit`);
		await page.evaluate(() => window.started);
	});

	// test('property is preselected', async ({ page, leaseForm }) => {
	// 	await preselected(
	// 		page,
	// 		page.locator('#propertyId'),
	// 		getAddress(leaseForm.property),
	// 	);
	// });

	test('unit is preselected', async ({ page, leaseForm }) => {
		await preselected(
			page,
			page.locator('#unitId'),
			[leaseForm.unit.type, leaseForm.unit.unitNumber]
				.filter((str) => str)
				.join(' '),
		);
	});

	test('tenant is preselected', async ({ page, leaseForm }) => {
		await preselected(
			page,
			page.locator('#tenantId'),
			getName(leaseForm.tenant),
		);
	});
});
