import {
	ClientModel,
	LeaseModel,
	MaintenanceOrderModel,
	PropertyModel,
	TenantModel,
	TransactionModel,
	UnitModel,
	type Entity,
	type Model,
} from '$models/interfaces';

const relationalNames = [
	'clientId',
	'propertyId',
	'unitId',
	'tenantId',
] as const;

export function getModel(entity: 'clients' | 'clientId'): typeof ClientModel;
export function getModel(
	entity: 'properties' | 'propertyId',
): typeof PropertyModel;
export function getModel(entity: 'units' | 'unitId'): typeof UnitModel;
export function getModel(entity: 'tenants' | 'tenantId'): typeof TenantModel;
export function getModel(entity: 'leases'): typeof LeaseModel;
export function getModel(
	entity: 'maintenanceOrders',
): typeof MaintenanceOrderModel;
export function getModel(entity: 'transactions'): typeof TransactionModel;
export function getModel(
	entity: Entity | typeof relationalNames[number],
): Model;

export function getModel(entity: Entity | typeof relationalNames[number]) {
	if (entity === 'clients' || entity === 'clientId') {
		return ClientModel;
	}
	if (entity === 'properties' || entity === 'propertyId') {
		return PropertyModel;
	}
	if (entity === 'leases') {
		return LeaseModel;
	}
	if (entity === 'units' || entity === 'unitId') {
		return UnitModel;
	}
	if (entity === 'tenants' || entity === 'tenantId') {
		return TenantModel;
	}
	if (entity === 'maintenanceOrders') {
		return MaintenanceOrderModel;
	}
	if (entity === 'transactions') {
		return TransactionModel;
	}
	throw new Error(`Unknown entity: ${entity}`);
}
