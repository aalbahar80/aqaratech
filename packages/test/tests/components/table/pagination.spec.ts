import { expect } from '@playwright/test';
import { getRoute, PageTypePortfolio } from '@self/utils';
import * as R from 'remeda';
import { test } from '../../api/api-fixtures';
import { TablePage } from './TablePage';

const TOTAL = 35;
const SIZE = 20;

test.use({
	userRoleType: 'PORTFOLIO',
	expensesParams: R.times(TOTAL, () => ({
		amount: 30,
	})),
	page: async (
		{ scopedPage: page, org, portfolio, expenses: _expenses },
		use,
	) => {
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

		await use(page);
	},
});

test('table pagination smoke test', async ({ page }) => {
	const table = new TablePage(page);

	const info = `Showing 1 to ${SIZE} of ${TOTAL} results`;
	await expect.soft(table.info).toHaveText(info);

	await expect(table.next).toBeEnabled();
	await expect(table.prev).toBeDisabled();

	await table.next.click();

	await expect(table.next).toBeDisabled();
	await expect(table.prev).toBeEnabled();

	const info2 = `Showing ${SIZE + 1} to ${TOTAL} of ${TOTAL} results`;
	await expect.soft(table.info).toHaveText(info2);

	await expect(table.size).toHaveValue('20');
});

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
