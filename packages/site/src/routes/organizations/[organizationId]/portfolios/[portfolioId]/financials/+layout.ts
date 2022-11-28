import { createApi } from '$api';
import { FilterInitial } from '$lib/stores/filter/Filter.enum';
import { property } from '$lib/stores/filter/property';
import { unit } from '$lib/stores/filter/unit';
import type { LayoutLoad } from './$types';

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

	const properties = await api.portfolios.findProperties({
		id: portfolioId,
		take: 100,
	});

	const units = await api.portfolios.findUnits({
		id: portfolioId,
		take: 100,
	});

	return {
		properties,
		units,
	};
};
