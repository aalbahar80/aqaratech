import { createApi } from '$api';
import { FilterInitial } from '$lib/stores/filter/Filter.enum';
import { property } from '$lib/stores/filter/property';
import { unit } from '$lib/stores/filter/unit';
import type { LayoutLoad } from './$types';

// This load function gets called on every request because it depends on
// url.searchParams. Ideally, we'd only call it if the query string changed,or
// if there is any searchParams at all.

export const load: LayoutLoad = async ({
	fetch,
	params,
	url: { searchParams },
}) => {
	// Initialize filter stores (property/unit). This way, child routes accessing
	// the filter stores have access to any filter values that were set in the
	// URL.

	// Property filter
	const propertyId = searchParams.get(FilterInitial.Property);
	if (propertyId) {
		property.set(propertyId);
	}

	// Unit filter
	const unitId = searchParams.get(FilterInitial.Unit);
	if (unitId) {
		unit.set(unitId);
	}

	const portfolioId = params.portfolioId;

	const api = createApi(fetch);

	const [portfolio, properties, units] = await Promise.all([
		api.portfolios.findOne({
			id: portfolioId,
		}),

		api.portfolios.findProperties({
			id: portfolioId,
			take: 100,
		}),

		api.portfolios.findUnits({
			id: portfolioId,
			take: 100,
		}),
	]);

	return {
		portfolio,
		properties,
		units,
	};
};
