import { expect, Page } from '@playwright/test';
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

		await this.page.goto(this.url, { waitUntil: 'load' });

		const row = this.page.getByTestId(this.items[0].id);
		const view = row.getByRole('link', { name: 'View' });
		await view.click();

		const menu = this.page.getByRole('button', { name: 'Open options' });
		await menu.click();

		const remove = this.page.getByRole('button', { name: 'Delete' });
		await expect(remove).toBeVisible();
		await remove.click();

		const modal = this.page.getByTestId('modal');
		const confirm = modal.getByRole('button', { name: 'Delete' });
		await confirm.click();

		await expect(this.page).toHaveURL(this.url);

		// check modal is closed
		await expect(modal).not.toBeVisible();

		// check other rows are still there
		await expect(this.page.getByTestId(this.items[1].id)).toBeVisible();
		await expect(this.page.getByTestId(this.items[2].id)).toBeVisible();

		await expect(this.page.getByTestId(this.items[0].id)).not.toBeVisible();

		// Check pagination info is updated
		const info = 'Showing 1 to 2 of 2 results';
		await expect(this.page.getByText(info)).toBeVisible();
	}
}

const assertCount = <T, Count extends number>(
	items: T[],
	count: Count,
): items is List.Repeat<T, typeof count> => {
	return items.length === count;
};
