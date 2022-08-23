import type {
	PaginatedPortfolioDto,
	PaginatedPropertyDto,
	PaginatedTenantDto,
	PaginatedUnitDto,
} from '@self/sdk';

export const tenantsToOptions = (tenants: PaginatedTenantDto) =>
	tenants.results.map((tenant) => ({
		value: tenant.id,
		label: tenant.fullName,
	}));

export const portfoliosToOptions = (portfolios: PaginatedPortfolioDto) =>
	portfolios.results.map((portfolio) => ({
		value: portfolio.id,
		label: portfolio.fullName,
	}));

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
