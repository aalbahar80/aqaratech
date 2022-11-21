import { expect } from '@playwright/test';
import { getRoute, PageTypePortfolio } from '@self/utils';
import * as R from 'remeda';
import { test } from '../../api/api-fixtures';

const TOTAL = 35;
const SIZE = 20;

test.use({
	userRoleType: 'PORTFOLIO',
	expensesParams: R.times(TOTAL, () => ({
		amount: 30,
	})),
});

test('table pagination smoke test', async ({
	scopedPage: page,
	org,
	portfolio,
	expenses: _expenses,
}) => {
	const url =
		getRoute({
			entity: 'portfolio',
			id: portfolio.id,
			pageType: PageTypePortfolio.Expenses,
			params: {
				organizationId: org.organization.id,
				portfolioId: portfolio.id,
			},
		}) + '/table';

	await page.goto(url);

	const info = page.getByText(`Showing 1 to ${SIZE} of ${TOTAL} results`);
	await expect.soft(info).toBeVisible();

	const next = page.getByRole('button', { name: 'Next' });
	const prev = page.getByRole('button', { name: 'Previous' });

	await expect(next).toBeEnabled();
	await expect(prev).toBeDisabled();

	await next.click();

	await expect(next).toBeDisabled();
	await expect(prev).toBeEnabled();

	const info2 = page.getByText(
		`Showing ${SIZE + 1} to ${TOTAL} of ${TOTAL} results`,
	);
	await expect.soft(info2).toBeVisible();

	const size = page.getByRole('combobox', { name: 'Page size' });
	await expect(size).toHaveValue('20');
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
test.fixme('should display current page number upon load', async ({}) => {});

// eslint-disable-next-line @typescript-eslint/no-empty-function
test.fixme('page number updates when pressing back button', async ({}) => {});

// eslint-disable-next-line @typescript-eslint/no-empty-function
test.fixme('data updates when pressing back button', async ({}) => {});

// eslint-disable-next-line @typescript-eslint/no-empty-function
test.fixme('can update pagesize', async ({}) => {});
