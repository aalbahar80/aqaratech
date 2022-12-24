import { expect, type Locator, type Page } from '@playwright/test';

export class Modal {
	readonly page: Page;
	readonly modal: Locator;

	constructor({ page }: { page: Page }) {
		this.page = page;
		this.modal = page.getByTestId('modal');
	}

	async deleteConfirm() {
		const confirm = this.modal.getByRole('button', { name: 'Delete' });
		await confirm.click();
	}

	async waitForHidden() {
		// check modal is closed
		await expect(this.modal).toBeHidden();
	}
}
