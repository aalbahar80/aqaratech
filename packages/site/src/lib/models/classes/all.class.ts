import type {
	EntityConstructor,
	EntityTitle,
} from '$lib/models/types/entity.type.js';
import { Portfolio } from './portfolio.class.js';
import { Expense } from './expense.class.js';
import { Lease } from './lease.class.js';
import { MaintenanceOrder } from './maintenanceOrder.class.js';
import { Property } from './property.class.js';
import { Tenant } from './tenant.class.js';
import { Transaction } from './transaction.class.js';
import { Unit } from './unit.class.js';

export const classMap: Record<EntityTitle, EntityConstructor> = {
	// 	portfolioId: Portfolio,
	portfolios: Portfolio,
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
	portfolioId: Portfolio,
	portfolios: Portfolio,
	propertyId: Property,
	properties: Property,
	unitId: Unit,
	units: Unit,
	tenantId: Tenant,
	tenants: Tenant,
	leaseId: Lease,
	leases: Lease,
};
