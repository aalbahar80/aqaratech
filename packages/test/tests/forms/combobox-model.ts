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
	readonly option: Option;

	constructor({
		page,
		key,
		option,
	}: {
		page: Page;
		option: Option;
		key: string;
	}) {
		this.page = page;
		this.key = getLabel(key);
		this.option = {
			label: option.label,
			value: option.value,
		};
	}

	async fill(key: string, value: string) {
		const input = this.page.getByLabel(key);

		await input.fill(value);

		// TODO getByRole/text instead of data-testid
		await this.page.getByTestId(value).click();
	}
}
