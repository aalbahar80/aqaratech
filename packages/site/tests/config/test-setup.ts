import { test as base } from '@playwright/test';
import type { FormFixtures } from '../playwright.config.js';

export type Newable<T> = { new (...args: any[]): T };

export const test = base.extend<FormFixtures>({
	page: async ({ page }, use) => {
		// Ensures that sveltekit is done hydrating the page
		// Ensures non-flaky tests
		await page.addInitScript({
			content: `
			window.started = new Promise((fulfil, reject) => {
				setTimeout(() => {
					reject(new Error('Did not receive sveltekit:start event'));
				}, 5000);
				addEventListener('sveltekit:start', () => {
					fulfil();
				});
			});
		`,
		});
		await use(page);
	},
	baseForm: ['clients', { option: true }],
});

export { expect } from '@playwright/test';
