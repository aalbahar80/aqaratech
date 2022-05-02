import { Client } from './client.class';
import { Expense } from './expense.class';
import { Lease } from './lease.class';
import { MaintenanceOrder } from './maintenanceOrder.class';
import { Property } from './property.class';
import { Tenant } from './tenant.class';
import { Transaction } from './transaction.class';
import { Unit } from './unit.class';

export const classMap = {
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
	transactionId: Transaction,
	transactions: Transaction,
	expenseId: Expense,
	expenses: Expense,
	maintenanceOrderId: MaintenanceOrder,
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
