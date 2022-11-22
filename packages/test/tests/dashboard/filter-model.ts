import type { Locator, Page } from '@playwright/test';
import { selectedLabel } from '../../utils/selected-label';

export class Filters {
	readonly page: Page;
	readonly property: Filter;
	readonly unit: Filter;
	readonly range: Filter;

	constructor(page: Page) {
		this.page = page;
		this.property = new Filter(
			page.getByRole('combobox', { name: 'Property' }),
		);
		this.unit = new Filter(page.getByRole('combobox', { name: 'Unit' }));
		this.range = new Filter(page.getByRole('combobox', { name: 'Range' }));
	}
}

export class Filter {
	readonly el: Locator;
	readonly label: () => Promise<string | undefined>;

	constructor(locator: Locator) {
		this.el = locator;
		this.label = async () => selectedLabel(locator);
	}
}
