import { expect } from '@playwright/test';
import { resolveURL } from 'ufo';

import { getLabel } from '@self/utils';

import { test } from './tree.fixture';

test.skip(({ isMobile }) => isMobile === true);

test('expense tile links to edit form', async ({ page }) => {
	const name = 'Fire Fighting Contract';

	const tile = page.getByText(name);

	await tile.getByRole('link', { name: 'Edit' }).click();

	// expect page to have url ending with /edit
	const re = /.*\/edit$/;
	await expect(page).toHaveURL(re);

	const labelEn = page.getByLabel('Label En');
	await expect(labelEn).toHaveValue(name);
});

test('new category button links to form', async ({ page, org }) => {
	const btn = page.getByRole('link', { name: 'Create New category' });

	const url = resolveURL(
		'/en',
		'/organizations',
		org.organization.id,
		'expense-categories',
		'new',
	);

	await expect.soft(btn).toHaveAttribute('href', url);

	await btn.click();

	await expect(page).toHaveURL(url);

	const labelEn = page.getByLabel(getLabel('labelEn'));

	await expect(labelEn).toBeEditable();
});
