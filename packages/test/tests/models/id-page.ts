import { expect, type Locator, type Page } from '@playwright/test';

import { Modal } from './modal';

/**
 * A model for common id page functionality.
 */
export class IdPage {
	readonly page: Page;
	readonly menu: Locator;

	constructor({ page }: { page: Page }) {
		this.page = page;
		this.menu = this.page.getByRole('button', { name: 'Open options' });
	}

	async delete() {
		const remove = this.page.getByRole('button', { name: 'Delete' });

		await this.expandOptions(remove);

		await remove.click();

		const modal = new Modal({ page: this.page });
		await modal.deleteConfirm();
		await modal.waitForHidden();
	}

	/** Retry until the menu is open and the given button is enabled. */
	async expandOptions(btn: Locator) {
		await expect(async () => {
			await this.menu.click();
			await expect(btn).toBeEnabled({
				timeout: 100,
			});
		}).toPass();
	}
}
