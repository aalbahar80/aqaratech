import { redirect } from '@sveltejs/kit';

import type { PageLoad } from './$types';
import { FilterInitial } from '@self/utils';

import { REDIRECT_TO } from '$lib/constants/misc';
import { property } from '$lib/stores/filter/property';
import { unit } from '$lib/stores/filter/unit';

export const load: PageLoad = ({ url: { searchParams } }) => {
	// Initialize filter stores (property/unit), then redirect to the appropriate
	// page. Ideally, we would implement this in financials/+layout.ts. The reason
	// we can't do that is because this function requires url.searchParams. Making
	// financials/+layout.ts depend on url.searchParams would cause it to be
	// reloaded on every request, which is not ideal.

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

	const location = searchParams.get(REDIRECT_TO);
	if (!location) {
		throw new Error('redirectTo query param is required');
	}

	throw redirect(302, location);
};
