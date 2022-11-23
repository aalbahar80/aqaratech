import type { Locator, Page } from '@playwright/test';

export class SidebarModel {
	readonly page: Page;
	readonly toggle: Locator;

	constructor(page: Page) {
		this.page = page;
		this.toggle = page.getByRole('button', { name: 'Toggle sidebar' });
	}
}
