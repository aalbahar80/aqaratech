import type {
	EntityConstructor,
	EntityTitle,
} from '$lib/models/types/entity.type.js';
import { Client } from './client.class.js';
import { Expense } from './expense.class.js';
import { Lease } from './lease.class.js';
import { MaintenanceOrder } from './maintenanceOrder.class.js';
import { Property } from './property.class.js';
import { Tenant } from './tenant.class.js';
import { Transaction } from './transaction.class.js';
import { Unit } from './unit.class.js';

export const classMap: Record<EntityTitle, EntityConstructor> = {
	// 	clientId: Client,
	clients: Client,
	// 	propertyId: Property,
	properties: Property,
	// 	unitId: Unit,
	units: Unit,
	// 	tenantId: Tenant,
	tenants: Tenant,
	// 	leaseId: Lease,
	leases: Lease,
	// 	transactionId: Transaction,
	transactions: Transaction,
	// 	expenseId: Expense,
	expenses: Expense,
	// 	maintenanceOrderId: MaintenanceOrder,
	maintenanceOrders: MaintenanceOrder,
};

export const relationalClassMap = {
	clientId: Client,
	clients: Client,
	propertyId: Property,
	properties: Property,
	unitId: Unit,
	units: Unit,
	tenantId: Tenant,
	tenants: Tenant,
	leaseId: Lease,
	leases: Lease,
};
