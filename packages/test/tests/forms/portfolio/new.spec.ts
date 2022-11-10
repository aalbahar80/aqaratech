import { expect } from '@playwright/test';
import { portfolioFactory } from '@self/seed';
import { getRoute, PageType } from '@self/utils';
import * as R from 'remeda';
import { uuid } from '../../../utils/uuid';
import { test } from '../../api/api-fixtures';
import { FormPage } from '../form-page-model';

test('can be submitted with minimal fields', async ({ org, page }) => {
	const portfolio = R.pipe(
		portfolioFactory.build({
			organizationId: org.organization.id,
		}),
		R.pick(['fullName']),
	);

	const url = getRoute({
		entity: 'portfolio',
		pageType: PageType.New,
		params: { organizationId: org.organization.id },
	});

	await page.goto(url);

	const formPage = new FormPage(page);
	await formPage.fillForm(portfolio);
	await formPage.save();

	const urlAfterSubmit = getRoute({
		entity: 'portfolio',
		pageType: PageType.Id,
		id: ':uuid',
		params: { organizationId: org.organization.id },
	});

	await expect(page).toHaveURL(uuid(urlAfterSubmit));
});

test('can be submitted with all fields', async ({ org, page }) => {
	const portfolio = R.pipe(
		portfolioFactory.build({
			organizationId: org.organization.id,
		}),
		R.pick(['fullName', 'label', 'phone', 'dob', 'civilid']),
	);

	const url = getRoute({
		entity: 'portfolio',
		pageType: PageType.New,
		params: { organizationId: org.organization.id },
	});

	await page.goto(url);

	const formPage = new FormPage(page);
	await formPage.fillForm(portfolio);
	await formPage.save();

	const urlAfterSubmit = getRoute({
		entity: 'portfolio',
		pageType: PageType.Id,
		id: ':uuid',
		params: { organizationId: org.organization.id },
	});

	await expect(page).toHaveURL(uuid(urlAfterSubmit));
});
