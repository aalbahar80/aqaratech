import { expect } from '@playwright/test';
import * as R from 'remeda';

import { leasePartialFactory } from '@self/seed';
import { getRoute, PageType, FIELDS } from '@self/utils';

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
	const lease = R.pick(leasePartialFactory(), FIELDS.lease.required);

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

	await formPage.verifyDetails({
		...lease,
		tenant: tenants[5]!.fullName,
	});

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
	const lease = R.pick(leasePartialFactory(), FIELDS.lease.all);

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

	await formPage.verifyDetails({
		...R.omit(lease, ['tenantId']),
		tenant: tenants[5]!.fullName,
	});

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
