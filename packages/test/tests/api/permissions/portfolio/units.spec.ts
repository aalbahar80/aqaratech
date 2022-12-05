import { expect } from '@playwright/test';
import * as R from 'remeda';
import { test } from '../../api-fixtures';
import qs from 'qs';

test.use({
	userRoleType: 'PORTFOLIO',
	propertiesParams: R.times(3, () => ({})),
	unitsParams: R.times(20, () => ({})),
});

const units = ['/units', '/units-minimal'];

for (const route of units) {
	test(`can filter units by property: ${route}`, async ({
		portfolio,
		property,
		units,
		scopedRequest: request,
	}) => {
		const filter = {
			filter: {
				propertyId: { equals: property.id },
			},
		};

		const filterUri = qs.stringify(filter, { encode: false });

		const url = `/portfolios/${portfolio.id}${route}?${filterUri}`;

		const res = await request.get(url);

		await expect(res).toBeOK();

		// check that the response is filtered by property
		const body: unknown = await res.json();

		if (
			!body ||
			typeof body !== 'object' ||
			!('results' in body) ||
			!Array.isArray(body.results)
		) {
			throw new Error('Response is not paginated');
		}

		const unitCount = R.countBy(units, (u) => u.propertyId === property.id);
		const unitIds = units
			.filter((u) => u.propertyId === property.id)
			.map((u) => u.id);

		// check unit count
		expect(body.results).toHaveLength(unitCount);

		// check unit ids
		for (const unit of body.results) {
			const u = unit as { id: string };
			expect(unitIds).toContain(u.id);
		}
	});
}
