import type { PaginatedPropertyDto, PaginatedUnitDto } from '@self/sdk';

export const propertiesToOptions = (properties: PaginatedPropertyDto) =>
	properties.results.map((property) => ({
		value: property.id,
		label: property.breadcrumbs.property.label,
		meta: { parentId: property.portfolioId },
	}));

export const unitsToOptions = (units: PaginatedUnitDto) =>
	units.results.map((unit) => ({
		value: unit.id,
		label: unit.breadcrumbs.unit.label,
		meta: { parentId: unit.propertyId },
	}));
