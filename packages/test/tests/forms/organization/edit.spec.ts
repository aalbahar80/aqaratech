import { expect } from '@playwright/test';
import * as R from 'remeda';

import { organizationFactory } from '@self/seed';
import { FIELDS, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';
import { FormPage } from '../form-page-model';

const entity = 'organization';
const pageType = PageType.Edit;

test('can be submitted with minimal fields', async ({ org, page }) => {
	const fields = R.pick(
		organizationFactory.build(),
		FIELDS.organization.required,
	);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: org.organization.id,
		fixtures: { org },
	});

	await formPage.goto();
	await formPage.fillForm(fields);
	await formPage.save();

	await formPage.verifyDetails(fields);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});

test('can be submitted with all fields', async ({ org, page }) => {
	const fields = R.pick(organizationFactory.build(), FIELDS.organization.all);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: org.organization.id,
		fixtures: { org },
	});
	await formPage.goto();
	await formPage.fillForm(fields);
	await formPage.save();

	await formPage.verifyDetails(fields);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});
