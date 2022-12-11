import { expect, Page } from '@playwright/test';

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

		const modal = this.page.getByTestId('modal');
		const confirm = modal.getByRole('button', { name: 'Delete' });
		await confirm.click();

		// check modal is closed
		await expect(modal).not.toBeVisible();
	}
}
