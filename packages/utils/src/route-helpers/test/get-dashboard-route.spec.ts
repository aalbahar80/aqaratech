import { expect, test } from 'vitest';
import { PageTypePortfolio } from '../enums/page-tab-portfolio.enum';
import { getRoute } from '../get-route';

const params = { organizationId: '1' };

const input: [string, string, string][] = [
	[
		getRoute({
			entity: 'portfolio',
			id: '2',
			pageType: PageTypePortfolio.Summary,
			params,
			predefined: {
				propertyId: '3',
				unitId: '4',
				// FilterEnum.Property: '3',
				// FilterEnum.Unit: '4',
			},
		}),
		'/organizations/1/portfolios/2/financials/summary', // redirectTo
		'/organizations/1/portfolios/2/set-filter?initialPropertyId=3&initialUnitId=4', // href
	],
];

test.each(input)('getDashboardRoute', (actual, redirectTo, base) => {
	const expected = `${base}&redirectTo=${encodeURIComponent(redirectTo)}`;
	expect(actual).toBe(expected);
});
