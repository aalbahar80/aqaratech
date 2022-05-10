import { expect } from '@playwright/test';
import path from 'path';
import { test as base } from '../../config.js';
import { formClasses, type FormType } from '../form.js';
import type { FormFixtures } from '../playwright.config.js';
import * as R from 'remeda';
import { fileURLToPath } from 'url';

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
		await use(form);
	},
	baseForm: ['clients', { option: true }],
});

test('Edit form: relations are preselected', async ({ form, page }) => {
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
			await page.pause();
			if (label) {
				await page.pause();
				await expect(el).toContainText(label);
				await page.pause();
			}
		}
	}
});
