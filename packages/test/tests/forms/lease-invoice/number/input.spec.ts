import * as R from 'remeda';

import { leaseInvoicePartialFactory } from '@self/seed';
import { FIELDS, getRoute, PageType } from '@self/utils';

import { test } from '../../../api/api-fixtures';
import { FormPage } from '../../form-page-model';

const entity = 'leaseInvoice';

test('can enter decimal amount', async ({ org, portfolio, lease, page }) => {
	const leaseInvoice = R.pick(
		leaseInvoicePartialFactory({
			amount: 123.456,
		}),
		FIELDS.leaseInvoice.all,
	);

	const url = getRoute({
		entity,
		pageType: PageType.New,
		predefined: { leaseId: lease.id },
		params: {
			portfolioId: portfolio.id,
			organizationId: org.organization.id,
		},
	});

	await page.goto(url);

	const formPage = new FormPage(page);

	await formPage.fillForm(leaseInvoice);

	await formPage.save();

	await formPage.verifyDetails(leaseInvoice);
});

test('can edit decimal amount', async ({ org, portfolio, invoice, page }) => {
	const fields = R.pick(
		leaseInvoicePartialFactory({
			amount: 123.45,
		}),
		['amount'],
	);

	const formPage = new FormPage(page, {
		entity,
		pageType: PageType.Edit,
		id: invoice.id,
		fixtures: { org, portfolio },
	});

	await formPage.goto();
	await formPage.fillForm(fields);
	await formPage.save();

	await formPage.verifyDetails(fields);
});
