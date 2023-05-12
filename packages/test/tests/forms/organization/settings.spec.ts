import { expect } from '@playwright/test';

import { PageType, getLabel, getRoute } from '@self/utils';

import { test } from '../../api/api-fixtures';
import { apiURL } from '../../api/fixtures/api-url';
import { FormPage } from '../form-page-model';

const months = getLabel('dueDurationMonths');
const days = getLabel('dueDurationDays');

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type DueDuration = {
	dueDurationMonths: number;
	dueDurationDays: number;
};

test('dueDuration defaults to 1 month 0 days', async ({ page, org }) => {
	const url = getRoute({
		entity: 'organization',
		pageType: PageType.Id,
		id: org.organization.id,
		params: {},
	});

	await page.goto(url);

	const form = new FormPage(page);

	const duration: DueDuration = {
		dueDurationMonths: 1,
		dueDurationDays: 0,
	};

	await form.verifyDetails(duration);
});

test('can be changed to 2 months 1 day', async ({ page, org }) => {
	const url = getRoute({
		entity: 'organization',
		pageType: PageType.Edit,
		id: org.organization.id,
		params: {},
	});

	await page.goto(url);

	const form = new FormPage(page);

	await page.getByLabel(months).fill('2');
	await page.getByLabel(days).fill('1');

	await form.save();

	const duration: DueDuration = {
		dueDurationMonths: 2,
		dueDurationDays: 1,
	};

	await form.verifyDetails(duration);
});

test('can be changed to 0 month 14 days', async ({ page, org }) => {
	const url = getRoute({
		entity: 'organization',
		pageType: PageType.Edit,
		id: org.organization.id,
		params: {},
	});

	await page.goto(url);

	const form = new FormPage(page);

	await page.getByLabel(months).fill('0');
	await page.getByLabel(days).fill('14');

	await form.save();

	const duration: DueDuration = {
		dueDurationMonths: 0,
		dueDurationDays: 14,
	};

	await form.verifyDetails(duration);
});

test('can be changed to 0 month 0 days', async ({ page, org }) => {
	const url = getRoute({
		entity: 'organization',
		pageType: PageType.Edit,
		id: org.organization.id,
		params: {},
	});

	await page.goto(url);

	const form = new FormPage(page);

	await page.getByLabel(months).fill('0');
	await page.getByLabel(days).fill('0');

	await form.save();

	const duration: DueDuration = {
		dueDurationMonths: 0,
		dueDurationDays: 0,
	};

	await form.verifyDetails(duration);
});

test('reject negative values', async ({ page, org }) => {
	const url = getRoute({
		entity: 'organization',
		pageType: PageType.Edit,
		id: org.organization.id,
		params: {},
	});

	await page.goto(url);

	const form = new FormPage(page);

	await page.getByLabel(months).fill('-1');
	// await page.getByLabel(days).fill('0');

	await form.save();

	const toast = page.getByRole('status');
	const invalid = toast.getByText('Invalid form');

	await expect(invalid).toBeVisible();
});

test('reject non-numeric values', async ({ page, org }) => {
	const url = getRoute({
		entity: 'organization',
		pageType: PageType.Edit,
		id: org.organization.id,
		params: {},
	});

	await page.goto(url);

	const form = new FormPage(page);

	await page.getByLabel(months).fill('a');
	// await page.getByLabel(days).fill('0');

	await form.save();

	const toast = page.getByRole('status');
	const invalid = toast.getByText('Invalid form');

	await expect(invalid).toBeVisible();
});

test.describe('dueDuration update', () => {
	test.use({ invoicesParams: [{ postAt: '2030-01-01' }] });
	test('is immediately reflected in invoice', async ({
		page,
		org,
		invoice,
		request,
	}) => {
		const invoiceUrl = `${apiURL}/leaseInvoices/${invoice.id}`;
		const i: unknown = await (await request.get(invoiceUrl)).json();

		expect(i).toHaveProperty('dueAt', '2030-02-01T00:00:00.000Z');

		const url = getRoute({
			entity: 'organization',
			pageType: PageType.Edit,
			id: org.organization.id,
			params: {},
		});

		await page.goto(url);

		const form = new FormPage(page);

		await page.getByLabel(months).fill('2');
		await page.getByLabel(days).fill('14');

		await form.save();

		const duration: DueDuration = {
			dueDurationMonths: 2,
			dueDurationDays: 14,
		};

		await form.verifyDetails(duration);

		const i2: unknown = await (await request.get(invoiceUrl)).json();

		expect(i2).toHaveProperty('dueAt', '2030-03-15T00:00:00.000Z');
	});
});

test('due duration fields should not be viewable in create form', async ({
	page,
}) => {
	const url = getRoute({
		entity: 'organization',
		pageType: PageType.New,
		params: {},
	});

	await page.goto(url);

	await expect(
		page.getByLabel(getLabel('Full organization name')),
	).toBeVisible();
	await expect(page.getByLabel(months)).toBeHidden();
	await expect(page.getByLabel(days)).toBeHidden();
});

test('blank input is coerced to zero', async ({ page, org }) => {
	const url = getRoute({
		entity: 'organization',
		pageType: PageType.Edit,
		id: org.organization.id,
		params: {},
	});

	await page.goto(url);

	const form = new FormPage(page);

	// clear fields
	await page.getByLabel(months).fill('');
	await page.getByLabel(days).fill('');

	await form.save();

	const duration: DueDuration = {
		dueDurationMonths: 0,
		dueDurationDays: 0,
	};

	await form.verifyDetails(duration);
});
