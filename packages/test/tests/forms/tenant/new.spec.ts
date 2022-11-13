import { expect } from '@playwright/test';
import { tenantFactory } from '@self/seed';
import { PageType } from '@self/utils';
import * as R from 'remeda';
import { test } from '../../api/api-fixtures';
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

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});

test('can be submitted with all fields', async ({ org, page }) => {
	const tenant = R.pipe(
		tenantFactory.build({
			organizationId: org.organization.id,
		}),
		R.pick(['fullName', 'label', 'phone', 'dob', 'civilid']),
	);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		fixtures: { org },
	});

	await formPage.goto();
	await formPage.fillForm(tenant);
	await formPage.save();

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});
