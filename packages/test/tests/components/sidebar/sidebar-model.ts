import { expect, Locator, Page } from '@playwright/test';

export class SidebarModel {
	readonly page: Page;
	/**
	 * Button to open/close sidebar
	 */
	readonly toggle: Locator;

	constructor(page: Page) {
		this.page = page;
		this.toggle = page.getByRole('button', { name: 'Sidebar' });
	}

	async open() {
		await this.toggle.click();
		await this.assertOpen();
	}

	async close() {
		await this.toggle.click();
		await this.assertClosed();
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
