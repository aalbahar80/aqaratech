import type { Locator, Page } from '@playwright/test';

export class FormPage {
	readonly page: Page;
	readonly saveButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.saveButton = page.getByRole('button', { name: 'Save' });
	}

	async save() {
		await this.saveButton.click();
	}

	fillForm = async (fields: Record<string, unknown>) => {
		for (const [key, value] of Object.entries(fields)) {
			let valueString: string;

			if (typeof value === 'string') {
				valueString = value;
			} else if (typeof value === 'number') {
				valueString = value.toString();
			} else {
				// TODO: Handle other types
				throw new Error(`Unsupported value type: ${typeof value}`);
			}

			await this.page.locator(`input[name="${key}"]`).fill(valueString);
		}
	};
}
