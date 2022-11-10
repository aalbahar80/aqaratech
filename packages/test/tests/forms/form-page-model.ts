import type { Locator, Page } from '@playwright/test';
import { getLabel } from '@self/utils';
import * as R from 'remeda';

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
		const labeled = R.mapKeys(fields, (key) => getLabel(key));

		for (const [key, value] of Object.entries(labeled)) {
			let valueString: string;

			if (typeof value === 'string') {
				valueString = value;
			} else if (typeof value === 'number') {
				valueString = value.toString();
			} else if (value === null) {
				valueString = '';
			} else {
				// TODO: Handle other types as needed
				throw new Error(`Unsupported value type: ${typeof value}`);
			}

			await this.page.getByLabel(key).fill(valueString);
		}
	};
}
