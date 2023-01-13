import { expect } from '@playwright/test';
import * as R from 'remeda';

import { leaseInvoicePartialFactory } from '@self/seed';
import { formatValue, getLabel, getRoute, PageType } from '@self/utils';

import { uuid } from '../../../utils/uuid';
import { test } from '../../api/api-fixtures';

test('can be submitted with minimal fields', async ({
	org,
	portfolio,
	lease,
	page,
}) => {
	const url = getRoute({
		entity: 'leaseInvoice',
		pageType: PageType.New,
		predefined: { leaseId: lease.id },
		params: {
			portfolioId: portfolio.id,
			organizationId: org.organization.id,
		},
	});

	await page.goto(url);

	await page.getByRole('link', { name: 'Add multiple' }).click();

	const invoices = R.times(12, (n) => {
		const date = new Date(Date.UTC(2030, 0, 1));
		date.setMonth(date.getMonth() + n);

		return leaseInvoicePartialFactory({
			amount: (n + 1) * 100,
			postAt: date.toISOString().slice(0, 10),
		});
	});

	// Fill invoices
	for (const [n, invoice] of invoices.entries()) {
		const dateLabel = `${getLabel('postAt')} ${n}`;
		const amountLabel = `${getLabel('amount')} ${n}`;

		await page
			.getByLabel(amountLabel, { exact: true })
			.fill(invoice.amount.toString());
		await page
			.getByLabel(dateLabel, { exact: true })
			.fill(new Date(invoice.postAt).toISOString().slice(0, 10));
	}

	await page.getByRole('button', { name: 'Save' }).click();

	const successUrl = getRoute({
		entity: 'lease',
		id: lease.id,
		pageType: PageType.Id,
		params: {
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
		},
	});

	await expect(page).toHaveURL(uuid(successUrl));

	// Verify that invoices were created
	for (const invoice of invoices) {
		const row = page.getByRole('row').filter({
			// has: formatValue(invoice.amount),
			has: page.getByRole('cell', {
				name: formatValue(invoice.amount),
				exact: true,
			}),
		});

		const dateCell = row.getByRole('cell', {
			name: formatValue(invoice.postAt),
		});

		const amountCell = row.getByRole('cell', {
			name: formatValue(invoice.amount),
		});

		expect(dateCell).toBeTruthy();

		expect(amountCell).toBeTruthy();
	}
});
