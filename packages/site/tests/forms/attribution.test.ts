import { getAddress, getName } from '../../src/lib/utils/common.js';
import { expect, test } from '../config/test-setup.js';
import { preselected } from '../utils.js';

test.use({ storageState: './config/adminStorageState.json' });
test.describe('Edit expense form', async () => {
	test.beforeEach(async ({ page, expenseForm }) => {
		await page.goto(`/${expenseForm.data.id}/edit`);
		await page.evaluate(() => window.started);
	});

	test('category is preselected', async ({ expenseForm, page }) => {
		const el = page.locator('#category');
		await preselected(page, el, expenseForm.data.category);
	});

	// test('radio is preselected', async ({ expenseForm, page }) => {
	// 	const el = page.locator('.selection');
	// 	const selected = await el.innerText();
	// 	expect(selected).toMatch(expenseForm.data);
	// });
});

// test('New expense: preselected clientId from URL', async ({
// 	page,
// 	clientForm,
// }) => {
// 	await page.goto(`/new/properties?clientId=${clientForm.id}`);
// 	await page.evaluate(() => window.started);
// 	await preselected(page, page.locator('#clientId'), getName(clientForm.data));
// });

// test.describe('new unit', async () => {
// 	test.beforeEach(async ({ page, expenseForm }) => {
// 		await page.goto(`/new/units?expenseId=${expenseForm.id}`);
// 		await page.evaluate(() => window.started);
// 	});

// test('preselected expense from URL', async ({ page, expenseForm }) => {
// 	await preselected(
// 		page,
// 		page.locator('#expenseId'),
// 		getAddress(expenseForm.data),
// 	);
// });

// 	test('preselected client from URL', async ({ page, expenseForm }) => {
// 		await preselected(
// 			page,
// 			page.locator('#clientId'),
// 			getName(expenseForm.client),
// 		);
// 	});
// });
