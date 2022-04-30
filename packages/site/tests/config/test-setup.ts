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
	single: string;
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
		await form.setup();
		const url = form.getUrl('edit');
		await page.goto(url);
		await page.evaluate(() => window.started);
		form.alter();
		await form.fill();
		await use(form);
		// await form.clean();
	},

	clientForm: async ({}, use) => {
		const clientForm = new ClientForm();
		await clientForm.setup();
		await use(clientForm);
		await clientForm.clean();
	},
	propertyForm: async ({}, use) => {
		const form = new PropertyForm();
		await form.setup();
		await use(form);
		await form.clean();
	},
	unitForm: async ({}, use) => {
		const form = new UnitForm();
		await form.setup();
		await use(form);
		await form.clean();
	},
	tenantForm: async ({}, use) => {
		const form = new TenantForm();
		await form.setup();
		await use(form);
		await form.clean();
	},
	leaseForm: async ({}, use) => {
		const form = new LeaseForm();
		await form.setup();
		await use(form);
		await form.clean();
	},
	expenseForm: async ({}, use) => {
		const form = new ExpenseForm();
		await form.setup();
		await use(form);
		await form.clean();
	},
	maintenanceOrderForm: async ({}, use) => {
		const form = new MaintenanceOrderForm();
		await form.setup();
		await use(form);
		await form.clean();
	},
});

export { expect } from '@playwright/test';
