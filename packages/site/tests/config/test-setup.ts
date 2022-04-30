import { test as base } from '@playwright/test';
import {
	ClientForm,
	ExpenseForm,
	LeaseForm,
	MaintenanceOrderForm,
	PropertyForm,
	TenantForm,
	UnitForm,
} from '../forms/form.js';

export type Newable<T> = { new (...args: any[]): T };

type Forms =
	| ClientForm
	| PropertyForm
	| UnitForm
	| TenantForm
	| LeaseForm
	| ExpenseForm
	| MaintenanceOrderForm;

export const test = base.extend<{ baseForm: Forms }>({
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
	baseForm: [new ClientForm(), { option: true }],
});

export { expect } from '@playwright/test';
