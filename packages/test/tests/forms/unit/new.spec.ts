import { expect } from '@playwright/test';
import * as R from 'remeda';

import { unitFactory } from '@self/seed';
import { getRoute, PageType } from '@self/utils';

import { uuid } from '../../../utils/uuid';
import { test } from '../../api/api-fixtures';
import { FormPage } from '../form-page-model';

const entity = 'unit';
const pageType = PageType.New;

test('can be submitted with minimal fields', async ({
	org,
	portfolio,
	property,
	page,
}) => {
	const unit = R.pick(
		unitFactory.build({
			organizationId: '',
			portfolioId: '',
			propertyId: '',
		}),
		['unitNumber'],
	);

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

	await formPage.fillForm(unit);
	await formPage.save();

	await formPage.verifyDetails(unit);

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
	const unit = R.pick(
		unitFactory.build({
			organizationId: '',
			portfolioId: '',
			propertyId: '',
		}),
		[
			'unitNumber',
			'bed',
			'bath',
			'size',
			'marketRent',
			'floor',
			'label',
			'type',
			'usage',
		],
	);

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

	await formPage.fillForm(unit);
	await formPage.save();

	await formPage.verifyDetails(unit);

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
