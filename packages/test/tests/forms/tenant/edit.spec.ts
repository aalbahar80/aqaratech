import { expect } from '@playwright/test';
import * as R from 'remeda';

import { tenantFactory } from '@self/seed';
import { countries, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';
import { ComboboxOption } from '../combobox-model';
import { FormPage } from '../form-page-model';

const entity = 'tenant';
const pageType = PageType.Edit;

test('can be submitted with minimal fields', async ({ org, tenant, page }) => {
	const fields = R.pipe(
		tenantFactory.build({
			organizationId: tenant.id,
		}),
		R.pick(['fullName']),
	);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: tenant.id,
		fixtures: { org },
	});

	await formPage.goto();
	await formPage.fillForm(fields);
	await formPage.save();

	await formPage.verifyDetails(fields);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});

test('can be submitted with all fields', async ({ org, tenant, page }) => {
	const fields = R.pipe(
		tenantFactory.build({
			organizationId: tenant.id,
		}),
		R.pick(['fullName', 'label', 'phone', 'dob', 'civilid', 'nationality']),
	);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: tenant.id,
		fixtures: { org },
	});

	await formPage.goto();

	await formPage.fillForm({
		...fields,
		nationality: new ComboboxOption({
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			label: countries.find((c) => c.alpha3Code === fields.nationality)!.name,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			value: fields.nationality!,
		}),
	});
	await formPage.save();

	await formPage.verifyDetails(fields);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});
