import type { RoleTypeEnum } from '$api/openapi';
import type { DBEntitiesMap, Entity } from '@self/utils';

type SearchParam = string | null;

export interface PredefinedRole {
	entity: Entity;
	entityId: string;
	idField: NonNullable<DBEntitiesMap['idField']>;
	roleType: RoleTypeEnum;
}

export interface PredefinedProperty {
	portfolioId: SearchParam;
}

export interface PredefinedUnit {
	portfolioId: SearchParam;
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
	leaseId: string;
	portfolioId: string;
}

export interface PredefinedPayout {
	portfolioId: SearchParam;
}

export interface PredefinedFile {
	tenantId: SearchParam;
	portfolioId: SearchParam;
	propertyId: SearchParam;
	unitId: SearchParam;
	expenseId: SearchParam;
	leaseId: SearchParam;
	leaseInvoiceId: SearchParam;
	maintenanceOrderId: SearchParam;
}
