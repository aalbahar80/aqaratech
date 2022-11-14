import type { Page } from '@playwright/test';
import { getLabel } from '@self/utils';

const keyLabels = ['nationality', 'tenantId', 'type'];

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
		const input = this.page.getByLabel(this.key);

		await input.fill(option.label);

		// TODO getByRole/text instead of data-testid
		await this.page.getByTestId(option.value).click();
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
