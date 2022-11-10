import { expect } from '@playwright/test';
import { portfolioFactory } from '@self/seed';
import { getRoute, PageType } from '@self/utils';
import * as R from 'remeda';
import { uuid } from '../../../utils/uuid';
import { test } from '../../api/api-fixtures';
import { FormPage } from '../form-page-model';

test('can be submitted with minimal fields', async ({ portfolio, page }) => {
	const fields = R.pipe(
		portfolioFactory.build({
			organizationId: portfolio.id,
		}),
		R.pick(['fullName']),
	);

	const url = getRoute({
		entity: 'portfolio',
		pageType: PageType.Edit,
		id: portfolio.id,
		params: { organizationId: portfolio.organizationId },
	});

	await page.goto(url);

	const formPage = new FormPage(page);
	await formPage.fillForm(fields);
	await formPage.save();

	const urlAfterSubmit = getRoute({
		entity: 'portfolio',
		pageType: PageType.Id,
		id: portfolio.id,
		params: { organizationId: portfolio.organizationId },
	});

	await expect(page).toHaveURL(uuid(urlAfterSubmit));
});

test('can be submitted with all fields', async ({ portfolio, page }) => {
	const fields = R.pipe(
		portfolioFactory.build({
			organizationId: portfolio.id,
		}),
		R.pick(['fullName', 'label', 'phone', 'dob', 'civilid']),
	);

	const url = getRoute({
		entity: 'portfolio',
		pageType: PageType.Edit,
		id: portfolio.id,
		params: { organizationId: portfolio.organizationId },
	});

	await page.goto(url);

	const formPage = new FormPage(page);
	await formPage.fillForm(fields);
	await formPage.save();

	const urlAfterSubmit = getRoute({
		entity: 'portfolio',
		pageType: PageType.Id,
		id: portfolio.id,
		params: { organizationId: portfolio.organizationId },
	});

	await expect(page).toHaveURL(uuid(urlAfterSubmit));
});
