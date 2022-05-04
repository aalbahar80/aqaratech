import { getAddress, getName } from '../../src/lib/utils/common.js';
import { test as base } from '../config/test-setup.js';
import { preselected } from '../utils.js';
import { LeaseForm } from './form.js';

base.use({ storageState: './config/adminState.json' });
const test = base.extend<{ form: LeaseForm }>({
	form: async ({ page }, use) => {
		const form = new LeaseForm();
		form.page = page;
		await form.setupEdit();
		await use(form);
	},
});

test('new lease: preselected client from URL', async ({ page, form }) => {
	await page.goto(`/new/leases?unitId=${form.unit.id}`);
	await preselected(page, page.locator('#clientId'), getName(form.client));
});

test('new lease: preselected property from URL', async ({ page, form }) => {
	await page.goto(`/new/leases?unitId=${form.unit.id}`);
	await preselected(
		page,
		page.locator('#propertyId'),
		getAddress(form.property),
	);
});

test('new lease: preselected unit from URL', async ({ page, form }) => {
	await page.goto(`/new/leases?unitId=${form.unit.id}`);
	await preselected(
		page,
		page.locator('#unitId'),
		[form.unit.type, form.unit.unitNumber].filter((str) => str).join(' '),
	);
});

test('new lease: preselected tenant from URL', async ({ page, form }) => {
	await page.goto(`/new/leases?tenantId=${form.tenant.id}`);
	await preselected(page, page.locator('#tenantId'), getName(form.tenant));
});

test.describe('edit lease', async () => {
	test.beforeEach(async ({ page, form }) => {
		await page.goto(`/leases/${form.id}/edit`);
	});

	// TODO: implement this before testing it
	// test('property is preselected', async ({ page, form }) => {
	// 	await preselected(
	// 		page,
	// 		page.locator('#propertyId'),
	// 		getAddress(form.property),
	// 	);
	// });

	test('unit is preselected', async ({ page, form }) => {
		await preselected(
			page,
			page.locator('#unitId'),
			[form.unit.type, form.unit.unitNumber].filter((str) => str).join(' '),
		);
	});

	test('tenant is preselected', async ({ page, form }) => {
		await preselected(page, page.locator('#tenantId'), getName(form.tenant));
	});
});
