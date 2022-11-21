// a TablePage class to be used in tests

import type { Page, Locator } from '@playwright/test';

export class TablePage {
	readonly page: Page;

	// Pagination

	// Page navigation
	readonly next: Locator;
	readonly prev: Locator;
	readonly range: (page: number) => Locator;

	// Page size
	readonly size: Locator;

	// Pagination info
	readonly info: Locator;

	// Filters
	readonly property: Locator;

	constructor(page: Page) {
		this.page = page;

		// Pagination
		this.next = page.getByRole('button', { name: 'Next' });
		this.prev = page.getByRole('button', { name: 'Previous' });

		this.range = (page: number) =>
			this.page
				.getByRole('navigation', { name: 'Pagination' })
				.getByRole('button', { name: page.toString() });

		this.size = page.getByRole('combobox', { name: 'Page size' });

		this.info = page.getByTestId('pagination-info');

		// Filters
		this.property = page.getByRole('combobox', { name: 'Property' });
	}
}
