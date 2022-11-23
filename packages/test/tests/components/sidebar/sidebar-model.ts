import { expect, Locator, Page } from '@playwright/test';

export class SidebarModel {
	readonly page: Page;
	readonly toggle: Locator;

	constructor(page: Page) {
		this.page = page;
		this.toggle = page.getByRole('button', { name: 'Sidebar' });
	}

	async assertOpen() {
		const btn = this.page.getByRole('button', {
			name: 'Sidebar',
			expanded: true,
		});

		await expect(btn).toBeVisible();
	}

	async assertClosed() {
		const btn = this.page.getByRole('button', {
			name: 'Sidebar',
			expanded: false,
		});

		await expect(btn).toBeVisible();
	}
}
