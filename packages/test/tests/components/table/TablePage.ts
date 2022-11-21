// a TablePage class to be used in tests

import type { Page, Locator } from '@playwright/test';

export class TablePage {
	readonly page: Page;
	readonly next: Locator;
	readonly prev: Locator;
	readonly size: Locator;
	readonly info: Locator;

	constructor(page: Page) {
		this.page = page;
		this.next = page.getByRole('button', { name: 'Next' });
		this.prev = page.getByRole('button', { name: 'Previous' });
		this.size = page.getByRole('combobox', { name: 'Page size' });
		this.info = page.getByTestId('pagination-info');
	}
}
