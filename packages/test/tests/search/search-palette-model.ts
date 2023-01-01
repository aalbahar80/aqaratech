import type { Page } from '@playwright/test';

/** A model for the global search palette. */
export class SearchPalette {
	readonly page: Page;
	readonly isMobile: boolean | undefined;

	constructor({
		page,
		isMobile,
	}: {
		page: Page;
		isMobile: boolean | undefined;
	}) {
		this.page = page;
		this.isMobile = isMobile;
	}

	async open() {
		if (this.isMobile) {
			await this.page.getByRole('button', { name: 'Sidebar' }).click();
		}

		const btn = this.page.getByRole('button', { name: 'Search' });
		await btn.click();
	}
}
