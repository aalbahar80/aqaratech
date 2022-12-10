import { expect, Page } from '@playwright/test';

import { getLabel } from '@self/utils';

const keyLabels = ['nationality', 'tenantId', 'categoryId', 'area'];

interface Option {
	label: string;
	value: string;
}

export class Combobox {
	static keys = keyLabels.map((key) => getLabel(key));

	readonly page: Page;
	/**
	 * The field label.
	 */
	readonly key: string;

	constructor({ page, key }: { page: Page; key: string }) {
		this.page = page;
		this.key = getLabel(key);
	}

	async fill(option: ComboboxOption) {
		// The key may be followed by an asterisk.
		const keyRegex = new RegExp(`${this.key}|${this.key} \\*`);

		const input = this.page.getByLabel(keyRegex);

		await input.fill(option.label);

		// Options with similar labels may exist. So we need to get by data-testid then
		// test the label.
		const target = this.page.getByTestId(option.value);

		await expect(target).toHaveText(new RegExp(`${option.label}`));

		await target.click();
	}
}

export class ComboboxOption {
	readonly label: string;
	readonly value: string;

	constructor({ label, value }: Option) {
		this.label = label;
		this.value = value;
	}
}
