import { expect } from '@playwright/test';
import * as R from 'remeda';

import { leaseInvoicePartialFactory } from '@self/seed';
import { getLabel, getRoute, PageType } from '@self/utils';

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

	await page.getByRole('link', { name: 'Add multiple invoices' }).click();

	const invoices = R.times(12, () => leaseInvoicePartialFactory());

	// loop with index
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

	await page.getByRole('button', { name: 'Create' }).click();

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
});
