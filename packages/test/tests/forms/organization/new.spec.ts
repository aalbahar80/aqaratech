import { expect } from '@playwright/test';
import * as R from 'remeda';

import { organizationFactory } from '@self/seed';
import { FIELDS, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';
import { FormPage } from '../form-page-model';

const entity = 'organization';
const pageType = PageType.New;

test('can be submitted with minimal fields', async ({ org, page }) => {
	const organization = R.pick(
		organizationFactory.build(),
		FIELDS.organization.required,
	);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		fixtures: { org },
	});

	await formPage.goto();
	await formPage.fillForm(organization);

	const responsePromise = page.waitForResponse(
		(res) => res.request().method() === 'POST',
	);

	await formPage.save();

	// This can a bit slow since it depends on stripe api
	await responsePromise;

	await formPage.verifyDetails(organization);
	await expect(page).toHaveURL(formPage.getSuccessUrl());
});

test('can be submitted with all fields', async ({ org, page }) => {
	const organization = R.pick(
		organizationFactory.build(),
		FIELDS.organization.all,
	);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		fixtures: { org },
	});

	await formPage.goto();
	await formPage.fillForm(organization);

	const responsePromise = page.waitForResponse(
		(res) => res.request().method() === 'POST',
	);

	await formPage.save();

	// This can a bit slow since it depends on stripe api
	await responsePromise;

	await formPage.verifyDetails(organization);
	await expect(page).toHaveURL(formPage.getSuccessUrl());
});
