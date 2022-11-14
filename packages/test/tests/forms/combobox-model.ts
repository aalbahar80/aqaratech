import type { Page } from '@playwright/test';
import { getLabel } from '@self/utils';

const keyLabels = ['nationality', 'tenantId', 'type'];

export class Combobox {
	static keys = keyLabels.map((key) => getLabel(key));

	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async fill(key: string, value: string) {
		const input = this.page.getByLabel(key);

		await input.fill(value);

		// TODO getByRole/text instead of data-testid
		await this.page.getByTestId(value).click();
	}
}
