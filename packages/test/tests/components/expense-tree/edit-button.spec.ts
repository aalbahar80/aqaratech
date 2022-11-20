import { expect } from '@playwright/test';
import { test } from './tree.fixture';

test('expense tile links to edit form', async ({ page }) => {
	const name = 'Fire Fighting Contract';

	const tile = page.getByText(name);

	await tile.getByRole('link', { name: 'Edit' }).click();

	// expect page to have url ending with /edit
	const re = new RegExp(`.*/edit$`);
	await expect(page).toHaveURL(re);

	const labelEn = page.getByLabel('Label En');
	await expect(labelEn).toHaveValue(name);
});
