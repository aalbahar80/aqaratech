import { selectedLabel } from '../../utils/selected-label';

import type { Locator, Page } from '@playwright/test';

export class Filters {
	readonly page: Page;
	readonly property: Filter;
	readonly unit: Filter;
	readonly range: Filter;
	readonly start: Locator;
	readonly end: Locator;

	constructor(page: Page) {
		this.page = page;
		this.start = page.getByLabel('start');
		this.end = page.getByLabel('end');
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
