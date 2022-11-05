import { getRoute } from 'src/route-helpers/get-route';
import {
	PageType,
	PageTypePortfolio,
} from 'src/route-helpers/types/route-helpers.type';
import { expect, test } from 'vitest';

const pageTypes: [PageTypePortfolio | PageType, string][] = [
	[PageType.Edit, 'edit'],
	[PageTypePortfolio.Summary, 'financials/summary'],
	[PageTypePortfolio.Income, 'financials/income'],
	[PageTypePortfolio.Expenses, 'financials/expenses'],
	[PageTypePortfolio.Payouts, 'financials/payouts/table'],
];

test.each(pageTypes)('getRoute(%o) === %s', (pageType, expected) => {
	const input = {
		entity: 'portfolio',
		pageType,
		params: { organizationId: '1' },
		id: '3',
	};

	const url = `/organizations/1/portfolios/3/${expected}`;

	// @ts-expect-error test
	expect(getRoute(input)).toBe(url);
});
