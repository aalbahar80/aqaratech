import { expect } from '@playwright/test';
import path from 'path';
import * as R from 'remeda';
import { fileURLToPath } from 'url';
import type { FormFixtures } from '../../../playwright.config.js';
import { test as base } from '../../config.js';
import { formClasses, type FormType } from '../form.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

base.use({ storageState: path.resolve(__dirname, '../../adminState.json') });
const test = base.extend<FormFixtures & { form: FormType }>({
	form: async ({ page, baseForm }, use) => {
		const form = new formClasses[baseForm]();
		await form.setupEdit();
		const url = form.getUrl('edit');
		await page.goto(url);
		form.alter();
		await form.fill(page);
		await use(form);
	},
	baseForm: ['clients', { option: true }],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test(`returns 200`, async ({ form, page }) => {
	// const requestUrl = new RegExp(`${baseURL}/trpc`);
	const [request] = await Promise.all([
		// page.waitForRequest(/^\/trpc.*$/),
		// page.waitForRequest(
		// 	(request) =>
		// 		request.method() === 'POST' && request.url().match(requestUrl),
		// ),
		page.waitForRequest((request) => request.method() === 'POST'),
		page.click('button[type="submit"]'),
	]);
	const response = await request.response();
	expect(response?.ok()).toBe(true);
});

test(`redirects to details page`, async ({ form, page }) => {
	await page.click('button[type="submit"]');
	const re = new RegExp(
		`/${form.urlName}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
	);
	await expect(page).toHaveURL(re);
});

test(`basic details are correct`, async ({ form, page }) => {
	await Promise.all([
		page.click('button[type="submit"]'),
		page.waitForURL(/.*(?<!edit)$/),
	]);

	const pane = page.locator('#detailsPane');
	for (const b of form.basic()) {
		const re = new RegExp(`${b}`);
		await expect(pane).toContainText(re);
	}
});

test('relations are preselected', async ({ form, page }) => {
	const fields = form.ins.relationalFields as string[];
	const relations = form.ins.getRelationOptions();
	const relationMap: Record<string, keyof typeof relations> = {
		clientId: 'client',
		propertyId: 'property',
		unitId: 'unit',
		tenantId: 'tenant',
		leaseId: 'lease',
	};

	for (const [field, relation] of R.toPairs(relationMap)) {
		if (fields.includes(field)) {
			const el = page.locator(`#${field}`);
			const label = relations[relation]?.label;
			if (label) {
				await expect(el).toContainText(label);
			}
		}
	}
});
