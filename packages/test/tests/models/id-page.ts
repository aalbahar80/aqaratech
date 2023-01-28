import { expect, type Page } from '@playwright/test';

import { Modal } from './modal';

/**
 * A model for common id page functionality.
 */
export class IdPage {
	readonly page: Page;

	constructor({ page }: { page: Page }) {
		this.page = page;
	}

	async delete() {
		const menu = this.page.getByRole('button', { name: 'Open options' });
		const remove = this.page.getByRole('button', { name: 'Delete' });

		// Retry until the menu is open and the remove button is enabled.
		await expect(async () => {
			await menu.click();
			await expect(remove).toBeEnabled();
		}).toPass();

		await remove.click();

		const modal = new Modal({ page: this.page });
		await modal.deleteConfirm();
		await modal.waitForHidden();
	}
}
