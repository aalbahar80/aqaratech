/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect } from '@playwright/test';
import { leasePartialFactory } from '@self/seed';
import { getRoute, PageType } from '@self/utils';
import * as R from 'remeda';
import { uuid } from '../../../utils/uuid';
import { test } from '../../api/api-fixtures';
import { ComboboxOption } from '../combobox-model';
import { FormPage } from '../form-page-model';

const entity = 'lease';
const pageType = PageType.New;

test.use({
	tenantsParams: R.times(10, () => ({})),
});

test('can be submitted with minimal fields', async ({
	org,
	portfolio,
	tenants,
	unit,
	page,
}) => {
	const lease = R.pick(leasePartialFactory(), [
		'start',
		'end',
		'monthlyRent',
		'deposit',
	]);

	const url = getRoute({
		entity,
		pageType,
		predefined: { unitId: unit.id },
		params: {
			portfolioId: portfolio.id,
			organizationId: org.organization.id,
		},
	});

	await page.goto(url);

	const formPage = new FormPage(page);

	await formPage.fillForm({
		...lease,
		tenantId: new ComboboxOption({
			label: tenants[5]!.fullName,
			value: tenants[5]!.id,
		}),
	});

	await formPage.save();

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
	unit,
	tenants,
	page,
}) => {
	const lease = R.pick(leasePartialFactory(), [
		'start',
		'end',
		'monthlyRent',
		'deposit',
		'notify',
		'canPay',
		// 'license',
	]);

	const url = getRoute({
		entity,
		pageType,
		predefined: { unitId: unit.id },
		params: {
			portfolioId: portfolio.id,
			organizationId: org.organization.id,
		},
	});

	await page.goto(url);

	const formPage = new FormPage(page);

	await formPage.fillForm({
		...lease,
		tenantId: new ComboboxOption({
			label: tenants[5]!.fullName,
			value: tenants[5]!.id,
		}),
	});

	await formPage.save();

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
