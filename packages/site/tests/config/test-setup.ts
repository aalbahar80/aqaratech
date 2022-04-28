import { test as base } from '@playwright/test';
import {
	ClientForm,
	LeaseForm,
	PropertyForm,
	TenantForm,
	UnitForm,
} from '../forms/form.js';

export type Newable<T> = { new (...args: any[]): T };

export const test = base.extend<{
	clientForm: ClientForm;
	propertyForm: PropertyForm;
	unitForm: UnitForm;
	tenantForm: TenantForm;
	leaseForm: LeaseForm;
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
	clientForm: async ({ page }, use) => {
		const clientForm = new ClientForm(page);
		await clientForm.setup();
		await use(clientForm);
		await clientForm.clean();
	},
	propertyForm: async ({ page }, use) => {
		const form = new PropertyForm(page);
		await form.setup();
		await use(form);
		await form.clean();
	},
	unitForm: async ({ page }, use) => {
		const form = new UnitForm(page);
		await form.setup();
		await use(form);
		await form.clean();
	},
	tenantForm: async ({ page }, use) => {
		const form = new TenantForm(page);
		await form.setup();
		await use(form);
		await form.clean();
	},
	leaseForm: async ({ page }, use) => {
		const form = new LeaseForm(page);
		await form.setup();
		await use(form);
		await form.clean();
	},
});

export { expect } from '@playwright/test';
