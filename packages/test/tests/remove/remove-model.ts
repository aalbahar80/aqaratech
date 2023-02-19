import { expect, type Page } from '@playwright/test';

import { IdPage } from '../models/id-page';

import type { List } from 'ts-toolbelt';

interface Item {
	id: string;
}

/**
 * A model to test delete functionality.
 */
export class RemoveModel {
	readonly page: Page;
	readonly items: Item[];
	readonly url: string;

	constructor({
		page,
		items,
		url,
	}: {
		page: Page;
		items: Item[];
		url: string;
	}) {
		this.page = page;
		this.items = items;
		this.url = url;
	}

	async deleteAndVerify() {
		if (!assertCount(this.items, 3)) {
			throw new Error('Invalid number of items');
		}

		await this.page.goto(this.url);

		const row = this.page.getByTestId(this.items[0].id);
		const view = row.getByRole('link', { name: 'View' });

		await view.click();

		// We need to wait for the actual navigation,
		// otherwise the dropdown on the current page will be clicked.
		await expect(view).toBeHidden();

		const idPage = new IdPage({ page: this.page });
		await idPage.delete();

		await expect(this.page).toHaveURL(this.url);

		// check other rows are still there
		await expect(this.page.getByTestId(this.items[1].id)).toBeVisible();
		await expect(this.page.getByTestId(this.items[2].id)).toBeVisible();

		await expect(this.page.getByTestId(this.items[0].id)).toBeHidden();

		// Check pagination info is updated
		const info = '1 to 2 of 2';
		const els = this.page.getByText(info);

		// We only check if one of the elements is visible.
		// One is always hidden based on the viewport size.
		await expect(async () => {
			console.log('test');
			let infoVisible = false;
			for (const el of await els.all()) {
				if (await el.isVisible()) {
					infoVisible = true;
				}
			}
			if (!infoVisible) {
				throw new Error('Info is not visible');
			}
		}).toPass({
			timeout: 5000,
		});
	}
}

const assertCount = <T, Count extends number>(
	items: T[],
	count: Count,
): items is List.Repeat<T, typeof count> => {
	return items.length === count;
};
