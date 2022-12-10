import { expect } from '@playwright/test';
import * as R from 'remeda';

import { payoutPartialFactory } from '@self/seed';
import { FIELDS, getRoute, PageType } from '@self/utils';

import { uuid } from '../../../utils/uuid';
import { test } from '../../api/api-fixtures';
import { FormPage } from '../form-page-model';

const entity = 'payout';
const pageType = PageType.New;

test('can be submitted with minimal fields', async ({
	org,
	portfolio,
	property,
	page,
}) => {
	const payout = R.pick(payoutPartialFactory(), FIELDS.payout.required);

	const url = getRoute({
		entity,
		pageType,
		predefined: { propertyId: property.id },
		params: {
			portfolioId: portfolio.id,
			organizationId: org.organization.id,
		},
	});

	await page.goto(url);

	const formPage = new FormPage(page);

	await formPage.fillForm(payout);
	await formPage.save();

	await formPage.verifyDetails(payout);

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
	property,
	page,
}) => {
	const payout = R.pick(payoutPartialFactory(), FIELDS.payout.all);

	const url = getRoute({
		entity,
		pageType,
		predefined: { propertyId: property.id },
		params: {
			portfolioId: portfolio.id,
			organizationId: org.organization.id,
		},
	});

	await page.goto(url);

	const formPage = new FormPage(page);

	await formPage.fillForm(payout);
	await formPage.save();

	await formPage.verifyDetails(payout);

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
