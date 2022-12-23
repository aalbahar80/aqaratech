import { expect } from '@playwright/test';
import * as R from 'remeda';

import { leaseInvoicePartialFactory } from '@self/seed';
import { FIELDS, getRoute, PageType } from '@self/utils';

import { uuid } from '../../../utils/uuid';
import { test } from '../../api/api-fixtures';
import { FormPage } from '../form-page-model';

const entity = 'leaseInvoice';
const pageType = PageType.New;

test('can be submitted with minimal fields', async ({
	org,
	portfolio,
	lease,
	page,
}) => {
	const leaseInvoice = R.pick(
		leaseInvoicePartialFactory(),
		FIELDS.leaseInvoice.required,
	);

	const url = getRoute({
		entity,
		pageType,
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

	const successUrl = getRoute({
		entity,
		id: ':uuid',
		pageType: PageType.Id,
		params: {
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
		},
	});

	await expect(page).toHaveURL(uuid(successUrl));
});

test('can be submitted with all fields', async ({
	org,
	portfolio,
	lease,
	page,
}) => {
	const leaseInvoice = R.pick(
		leaseInvoicePartialFactory(),
		FIELDS.leaseInvoice.all,
	);

	const url = getRoute({
		entity,
		pageType,
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

	const successUrl = getRoute({
		entity,
		id: ':uuid',
		pageType: PageType.Id,
		params: {
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
		},
	});

	await expect(page).toHaveURL(uuid(successUrl));
});
