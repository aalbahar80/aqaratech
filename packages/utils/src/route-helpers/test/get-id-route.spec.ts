import { PageTab } from 'src/route-helpers/enums/page-tab.enum';
import { PageType } from 'src/route-helpers/enums/page-type.enum';
import { getRoute } from 'src/route-helpers/get-route';
import { expect, test, describe } from 'vitest';

const baseInput = {
	entity: 'property',
	params: { organizationId: '1', portfolioId: '2' },
	id: '3',
} as const;

const pageTypes = [
	[PageType.Edit, 'edit'],
	[PageTab.Details, ''],
	[PageTab.Files, 'files'],
	[PageTab.Financials, 'financials'],
	[PageTab.Occupancy, 'occupancy'],
	[PageTab.Units, 'units'],
	[PageTab.Leases, 'leases'],
	[PageTab.Invoices, 'invoices'],
] as const;

test.each(pageTypes)('getRoute(%o) === %s', (pageType, expected) => {
	const url = `/organizations/1/portfolios/2/properties/3/${expected}`;

	const input = {
		...baseInput,
		pageType,
	};

	// @ts-expect-error test
	const result = getRoute(input);

	expect(result).toBe(url);
});

test('errors on invalid page type', () => {
	const input = {
		...baseInput,
		pageType: 'invalid' as unknown,
	};

	// @ts-expect-error test
	expect(() => getRoute(input)).toThrowError('Invalid page address');
});
