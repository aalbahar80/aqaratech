import { expect } from '@playwright/test';
import { getRoute, PageType } from '@self/utils';
import * as R from 'remeda';
import { test } from '../../api/api-fixtures';

test.use({
	portfoliosParams: R.times(3, () => ({})),
});

test('delete portfolio', async ({ page, org, portfolio, portfolios }) => {
	const params = {
		organizationId: org.organization.id,
	};

	const url = getRoute({
		entity: 'portfolio',
		pageType: PageType.List,
		params,
	});

	await page.goto(url);

	const row = page.getByTestId(portfolio.id);
	const view = row.getByRole('link', { name: 'View' });
	await view.click();

	const menu = page.getByRole('button', { name: 'Open options' });
	await menu.click();

	const remove = page.getByRole('button', { name: 'Delete' });
	await remove.click();

	const modal = page.getByTestId('modal');
	const confirm = modal.getByRole('button', { name: 'Delete' });
	await confirm.click();

	await expect(page).toHaveURL(url);

	// check modal is closed
	await expect(modal).not.toBeVisible();

	// check other rows are still there
	await expect(page.getByTestId(portfolios[1]!.id)).toBeVisible();
	await expect(page.getByTestId(portfolios[2]!.id)).toBeVisible();

	await expect(page.getByTestId(portfolio.id)).not.toBeVisible();

	// Check pagination info is updated
	const info = 'Showing 1 to 2 of 2 results';
	await expect(page.getByText(info)).toBeVisible();
});
