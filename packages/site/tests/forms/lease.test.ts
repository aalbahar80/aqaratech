import { getAddress, getName } from '../../src/lib/utils/common.js';
import { test } from '../config/test-setup.js';
import { preselected } from '../utils.js';

test.use({ storageState: './config/adminStorageState.json' });
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
