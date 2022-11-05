import { PageTypePortfolio } from 'src/route-helpers/enums/page-tab-portfolio.enum';
import { PageTab } from 'src/route-helpers/enums/page-tab.enum';
import { PageType } from 'src/route-helpers/enums/page-type.enum';
import { getRoute } from 'src/route-helpers/get-route';
import { expect, test } from 'vitest';

const baseInput = {
	entity: 'portfolio',
	params: { organizationId: '1' },
	id: '3',
};

const pageTypes: [PageTypePortfolio | PageTab | PageType, string][] = [
	[PageType.Edit, 'edit'],
	[PageTypePortfolio.Summary, 'financials/summary'],
	[PageTypePortfolio.Income, 'financials/income'],
	[PageTypePortfolio.Expenses, 'financials/expenses'],
	[PageTypePortfolio.Payouts, 'financials/payouts/table'],
	[PageTab.Details, ''],
	[PageTab.Files, '/files'],
	[PageTab.Financials, '/financials'],
	[PageTab.Occupancy, '/occupancy'],
	[PageTab.Units, '/units'],
	[PageTab.Leases, '/leases'],
	[PageTab.Invoices, '/invoices'],
];

test.each(pageTypes)('getRoute(%o) === %s', (pageType, expected) => {
	const url = `/organizations/1/portfolios/3/${expected}`;

	const input = {
		...baseInput,
		pageType,
	};

	// @ts-expect-error test
	expect(getRoute(input)).toBe(url);
});

test('errors on invalid page type', () => {
	const input = {
		...baseInput,
		pageType: 'invalid' as unknown,
	};

	// @ts-expect-error test
	expect(() => getRoute(input)).toThrowError('Invalid page address');
});
