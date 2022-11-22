import type { Locator, Page } from '@playwright/test';

export class Filter {
	readonly page: Page;
	readonly property: Locator;
	readonly unit: Locator;
	readonly range: Locator;

	constructor(page: Page) {
		this.page = page;
		this.property = page.getByRole('combobox', { name: 'Property' });
		this.unit = page.getByRole('combobox', { name: 'Unit' });
		this.range = page.getByRole('combobox', { name: 'Range' });
	}
}
