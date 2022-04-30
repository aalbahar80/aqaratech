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

export const test = base.extend<{
	clientForm: ClientForm;
	propertyForm: PropertyForm;
	unitForm: UnitForm;
	tenantForm: TenantForm;
	leaseForm: LeaseForm;
	expenseForm: ExpenseForm;
	baseForm: Forms;
	form: Forms;
	maintenanceOrderForm: MaintenanceOrderForm;
}>({
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
	form: async ({ page, baseForm: form }, use) => {
		form.page = page;
		await form.setupEdit();
		const url = form.getUrl('edit');
		await page.goto(url);
		await page.evaluate(() => window.started);
		form.alter();
		await form.fill();
		await use(form);
		await form.clean();
	},
});

export { expect } from '@playwright/test';
