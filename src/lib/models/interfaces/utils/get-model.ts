import type { Entity, Model } from '$models/interfaces';
import {
	ClientModel,
	LeaseModel,
	MaintenanceOrderModel,
	PropertyModel,
	TenantModel,
	TransactionModel,
	UnitModel,
} from '$models/interfaces';

export const getModel = (entity: Entity): Model => {
	if (entity === 'clients') {
		return ClientModel;
	}
	if (entity === 'properties') {
		return PropertyModel;
	}
	if (entity === 'leases') {
		return LeaseModel;
	}
	if (entity === 'units') {
		return UnitModel;
	}
	if (entity === 'tenants') {
		return TenantModel;
	}
	if (entity === 'maintenanceOrders') {
		return MaintenanceOrderModel;
	}
	if (entity === 'transactions') {
		return TransactionModel;
	}
	throw new Error(`Unknown entity: ${entity}`);
};
