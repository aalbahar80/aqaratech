import {
	PageType,
	PageTypePortfolio,
} from '$lib/utils/route-helpers/route-helpers.type';
import { expect, test } from 'vitest';
import { getRoute } from '../get-route';

const pageTypes: [PageTypePortfolio | PageType, string][] = [
	[PageType.Edit, 'edit'],
	[PageTypePortfolio.Summary, 'financials/summary'],
	[PageTypePortfolio.Income, 'financials/income'],
	[PageTypePortfolio.Expenses, 'financials/expenses'],
	[PageTypePortfolio.Payouts, 'financials/payouts'],
];

test.each(pageTypes)('getRoute(%o) === %s', (pageType, expected) => {
	const input = {
		entity: 'portfolio',
		pageType,
		params: { organizationId: '1' },
		id: '3',
	};

	const url = `/organizations/1/portfolios/3/${expected}`;

	expect(getRoute(input)).toBe(url);
});
