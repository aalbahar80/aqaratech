import { expect } from '@playwright/test';
import { portfolioFactory } from '@self/seed';
import { getRoute, PageType } from '@self/utils';
import { uuid } from '../../../utils/uuid';
import { test } from '../../api/api-fixtures';

test.beforeEach(async ({ org, page }, info) => {
	const portfolio = portfolioFactory.build({
		organizationId: org.organization.id,
	});

	const url = getRoute({
		entity: 'portfolio',
		pageType: PageType.New,
		params: { organizationId: org.organization.id },
	});

	await page.goto(url);

	await page.getByLabel('Portfolio Name (full)').fill(portfolio.fullName);
	await page.getByLabel('label').fill(portfolio.label);
	await page.getByLabel('phone').fill(portfolio.phone);
	await page.getByLabel('Date of Birth').fill(portfolio.dob);
	await page.getByLabel('Civil ID').fill(portfolio.civilid);

	await page.getByRole('button', { name: 'Save' }).click();
});

test('can be submitted with minimal fields', async ({ org, page }, info) => {
	const urlAfterSubmit = getRoute({
		entity: 'portfolio',
		pageType: PageType.Id,
		id: ':uuid',
		params: { organizationId: org.organization.id },
	});

	await expect(page).toHaveURL(uuid(urlAfterSubmit));
});
