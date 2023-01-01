import { expect } from '@playwright/test';

import { assertCount } from '@self/seed';

import type { Locator, Page } from '@playwright/test';

/** A model for the global search palette. */
export class SearchPalette {
	readonly page: Page;
	readonly isMobile: boolean | undefined;
	readonly input: Locator;

	constructor({
		page,
		isMobile,
	}: {
		page: Page;
		isMobile: boolean | undefined;
	}) {
		this.page = page;
		this.isMobile = isMobile;
		this.input = this.page.getByPlaceholder('Search...');
	}

	async open() {
		if (this.isMobile) {
			await this.page.getByRole('button', { name: 'Sidebar' }).click();
		}

		const btn = this.page.getByRole('button', { name: 'Search' });
		await btn.click();
	}

	/** Search for a given text. Retries search until `result` is visibile. */
	async search({ query, result }: { query: string; result: Locator }) {
		// Keep trying to type until the result is visible
		// This is because search indexing is async and not instant
		await expect(async () => {
			await this.input.clear(); // clear to re-trigger search

			await this.input.fill(query);

			// check result
			await expect(result).toBeVisible({
				timeout: 1000, // short timeout to fail fast and retry
			});
		}).toPass();
	}

	async verifyResult({
		keysToValidate,
	}: {
		keysToValidate: DetailsPaneItem[];
	}) {
		if (assertCount(keysToValidate, 1)) {
			const key = this.page
				.getByTestId('details-pane')
				.getByTestId(keysToValidate[0][0])
				.getByText(keysToValidate[0][1]);

			await expect(key).toBeVisible();
		} else {
			throw new Error('TODO: handle multiple keys');
		}
	}

	async searchAndVerify({
		query,
		resultText,
		keysToValidate,
	}: {
		query: string;
		resultText: string;
		keysToValidate: DetailsPaneItem[];
	}) {
		await this.open();

		const result = this.page.getByRole('option', { name: resultText });

		await this.search({ query, result });

		// navigate to result
		await result.click();

		await this.verifyResult({ keysToValidate });
	}
}

export type DetailsPaneItem = [string, string];
