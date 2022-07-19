import type { EntityTitle } from '$lib/models/types/entity.type';

type SearchParam = string | null;
type FindIdFromArray = string | undefined;

export interface PredefinedRole {
	entity: EntityTitle;
	entityId: string;
	idField: string;
}

export interface PredefinedProperty {
	portfolioId: SearchParam;
}

export interface PredefinedUnit {
	portfolioId: FindIdFromArray;
	propertyId: SearchParam;
}

export interface PredefinedExpense {
	portfolioId: SearchParam;
	propertyId: SearchParam;
	unitId: SearchParam;
}

export interface PredefinedLease {
	portfolioId: SearchParam;
	propertyId: SearchParam;
	unitId: SearchParam;
	tenantId: SearchParam;
}

export interface PredefinedInvoice {
	leaseId: SearchParam;
}
