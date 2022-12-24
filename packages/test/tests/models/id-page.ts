import { Modal } from './modal';

import type { Page } from '@playwright/test';

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
		await menu.click();

		const remove = this.page.getByRole('button', { name: 'Delete' });
		await remove.click();

		const modal = new Modal({ page: this.page });
		await modal.deleteConfirm();
		await modal.waitForHidden();
	}
}
