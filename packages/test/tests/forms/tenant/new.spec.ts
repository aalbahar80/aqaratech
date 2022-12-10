import { expect } from '@playwright/test';
import * as R from 'remeda';

import { tenantFactory } from '@self/seed';
import { countries, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';
import { ComboboxOption } from '../combobox-model';
import { FormPage } from '../form-page-model';

const entity = 'tenant';
const pageType = PageType.New;

test('can be submitted with minimal fields', async ({ org, page }) => {
	const tenant = R.pipe(
		tenantFactory.build({
			organizationId: org.organization.id,
		}),
		R.pick(['fullName']),
	);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		fixtures: { org },
	});

	await formPage.goto();
	await formPage.fillForm(tenant);
	await formPage.save();

	await formPage.verifyDetails(tenant);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});

test('can be submitted with all fields', async ({ org, page }) => {
	const tenant = R.pipe(
		tenantFactory.build({
			organizationId: org.organization.id,
		}),
		R.pick(['fullName', 'label', 'phone', 'dob', 'civilid', 'nationality']),
	);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		fixtures: { org },
	});

	await formPage.goto();
	await formPage.fillForm({
		...tenant,
		nationality: new ComboboxOption({
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			label: countries.find((c) => c.alpha3Code === tenant.nationality)!.name,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			value: tenant.nationality!,
		}),
	});
	await formPage.save();

	await formPage.verifyDetails(tenant);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});
