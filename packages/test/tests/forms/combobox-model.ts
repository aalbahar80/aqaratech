import { getLabel } from '@self/utils';

import type { Page, Locator } from '@playwright/test';

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
		const input = this.page.getByLabel(this.key, { exact: true });

		await input.fill(option.label);

		let target: Locator;

		if (option.value) {
			// In some cases we need to rely on the value attribute. Example: Area labels are bilangual.
			// Therefore, we get by testid and then filter by label.
			target = this.page.getByTestId(option.value).filter({
				hasText: option.label,
			});
		} else {
			// Where possible, we rely on the label attribute only for higher quality tests.
			target = this.page.getByText(option.label);
		}

		await target.click();
	}
}

export class ComboboxOption {
	readonly label: string;
	readonly value?: string;

	constructor({ label, value }: Option) {
		this.label = label;
		this.value = value;
	}
}
